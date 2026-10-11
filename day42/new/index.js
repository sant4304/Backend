"use strict";
// console.log("hellooo")
// const a = "world"
// const b = 5
// console.log(a + b)
/**
 *
 * string,number,boolean,array, object ,tuple,void number
 * type
 *
 * any and unKnown
 *
 */
/**********************************************************************/
// const a = "hello World"
// console.log(typeof a)
/************************************************************************/
// const a :string ="Hello"
// const a :string =5  it give the error
/***************************************************************/
// const a :number =5
// console.log(a)
/*******************************************************************/
// const a :Array<number> = [1,2]
// console.log(a)
/*********************************************************/
// const a: number[] = [1,3]
// console.log(a)
// a.push(55)
// console.log(a)
/***************************************************/
// const a: number[] = [1,3]
// console.log(a)
// a.push("hello") // it can not asign it is array of number
// console.log(a) 
/***********************************************************************/
/**
 * Array :-fixed type but not fixex length
 *
 * Tuple :- fixed size and fixed length
 */
// const a: [number,number] = [1,3]
// console.log(a)
/************************void**********************************/
// function greet(name:string):void{
//     console.log("hello " + name)
// }
// //  it is void type function returning anything 
// greet("Vaani")
/**************************************************************/
// function greet(name:string){
//     console.log("hello " + name)
// }
// //  it is void type function returning anything 
// greet("Vaani")
/*************************************************************/
// function greet(name:string):string{
//     return "hello " + name
// }
// //  it is void type function returning anything 
// greet("Vaani")
// console.log(greet("vanni"))
/*********************never******************************************/
//function is never ending
// function greet(name:string):never{
//     throw new Error("Something went wrong ! ")
// }
// //  it is void type function returning anything 
// greet("Vaani")
/************************************************************************************************/
//type
// const user ={
//     name:"test",
//     age:34,
//     isMale:true
// }
// function greet(data:{name:String ,age:number ,isMale:boolean}){
//     console.log("hello " + data.name + " your age is " + data.age + " and your gender is " + data.isMale)
// }
// greet(user)
/**********************************************************/
// type USER =  {name:String ,age:number ,isMale:boolean}
// const user :USER ={
//     name:"test",
//     age:34,
//     isMale:true
// }
// function greet(data:USER):void{
//     console.log("hello " + data.name + " your age is " + data.age + " and your gender is " + data.isMale)
// }
// greet(user)
/**************************any********************************************************/
// any :- it is any type of variable
// let a:any
// a = "hello"
// console.log(a.toUpperCase())
/****************************************************************/
// let a:any
// a = 123
// console.log(a.toUpperCase())
//unkown :- it need some condtion to run the programm
// let a : unknown
// a = 123
// if((typeof a )=== "string"){
//     console.log(a.toUpperCase())
// }
// else{
//     console.log("not string")
// }
let a;
a = "hello";
if ((typeof a) === "string") {
    console.log(a.toUpperCase());
}
else {
    console.log("not string");
}
