export declare class AWS {
    base64_upload(id: any, img: any, type: any): Promise<string>;
    upload_image(filename: any, data: any): Promise<string>;
    upload_filetype(filename: any, fileContent: any): Promise<string>;
    delete_image(filename: any): Promise<boolean>;
    reame_image(oldKey: any): Promise<boolean>;
}
