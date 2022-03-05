type User ={
 uuid?: string;
 userName: string;
 userPassword?: string; // for segurity, its mandatory in registration, but not on user searches
}
export {User}