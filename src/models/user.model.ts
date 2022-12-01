type User ={
    uuid?: string;
    userName: string;
    userEmail: string;
    userPassword?:string;// for segurity, its mandatory in registration, but not on user searches
    userGoogleId?: string;
    userImgUrl?: string;
}
export {User}