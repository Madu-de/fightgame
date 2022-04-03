export class LocalStorage {
    public static getDataFromLocalhost(): any {
        let data: any = localStorage.getItem('fg:data');
        return data;
    }
    public static saveInLocalhost(): boolean {
        return true;
    }
}
