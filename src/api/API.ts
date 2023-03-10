import { localAPI as currentAPI } from "./localAPI";


export class API {
    static getAllItems() {
        return currentAPI.getAllItems();
    }

    static saveAllItems(items) {
        currentAPI.saveAllItems(items);
    }
}