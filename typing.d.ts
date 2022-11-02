interface fieldInterface {
    position: string;
    skill: string;
}

interface fieldArray extends Array<fieldInterface>{}

export interface Project {
  _id: string;
  desc: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  shortDesc: string;
  field: Array;
  userID: string;
  uni: string;
}

export interface User {}

export interface Message {}

export interface MessageBox {}
