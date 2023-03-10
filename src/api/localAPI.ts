export class localAPI {
    static  getAllItems() {
        let items = JSON.parse(localStorage.getItem('stockynotes-notes'));
        items = items.map(item => {
            if (item.text) return item
            return {...item, text: item.content}
        })

        return items
    }

    static  saveAllItems(items) {
        items = items.map(item => {
            if (item.content) return item
            return {...item, content: item.text}
        })
        localStorage.setItem('stockynotes-notes', JSON.stringify(items));
    }
}