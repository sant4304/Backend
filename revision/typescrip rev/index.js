"use strict";
// const a = 5
// const b = "Hello"
// console.log(a + b)
// const a = "hello"
//  console.log(typeof a)
// const a :string ="hello"
// console.log(a)
// const a :Array<number> =[1,2]
// console.log(a)
// a.push(5)
// console.log(a)
// const a: number[] =[1,3]
// console.log(a)
// a.push("hello")
// console.log(a)
// const a :[number , number] = [1,3]
// console.log(a)
// function greet(name:String):void{
//     console.log("Hello " +name)
// }
// greet("sam")
// function greet(name:string):string{
//     return "hello" + name
// }
// console.log(greet("vaani"))
// function greet(name:string):never{
//     throw new Error("Something went wrong")
// }
// greet("hollaa")
// type USER = {name:string , age:number ,isMale:boolean}
// const user :USER={
//     name:"Sam",
//     age:24,
//     isMale:true
// }
// function greet(data:USER):void{
//    console.log(data.name + data.age + data.isMale)
// }
// greet(user)
// let a :any
//  a = "hello"
//  console.log(a.toUpperCase())
let a;
a = 123;
if ((typeof a) === "string") {
    console.log(a.toUpperCase());
}
else {
    console.log("Not string");
}
