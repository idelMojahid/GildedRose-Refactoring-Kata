import { AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from "./constants";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (item.name === AGED_BRIE) {
                this.updateAgedBrie(item);
                continue;
            }

            if (item.name === SULFURAS) {
                continue;
            }

            if (item.name === BACKSTAGE_PASSES) {
                this.updateBackstagePasses(item);
                continue;
            }

            this.updateDefaultItem(item);
            continue;
        }

        return this.items;
    }
    updateAgedBrie(item) {
        item.sellIn -= 1;
        if (item.quality < 50) {
            if (item.sellIn >= 0 || item.quality === 49) {
                item.quality += 1;
            } else {
                item.quality += 2;
            }
        }
    }
    updateBackstagePasses(item) {
        item.sellIn -= 1;

        if (item.sellIn >= 10) {
            if (item.quality < 50) item.quality += 1;
            return;
        }

        if (item.sellIn >= 5) {
            item.quality += 2;
            if (item.quality > 50) item.quality = 50;
            return;
        }

        if (item.sellIn > 0) {
            item.quality += 3;
            if (item.quality > 50) item.quality = 50;
            return;
        }

        item.quality = 0;
    }

    updateDefaultItem(item) {
        item.sellIn -= 1;
        if (item.quality > 0) {
            if (item.sellIn < 0) {
                item.quality -= 2;
                if (item.quality < 0) item.quality = 0;
            } else item.quality -= 1;
        }
    }
}
