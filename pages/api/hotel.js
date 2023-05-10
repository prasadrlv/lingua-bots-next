// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from 'path';
import { readFileSync } from 'fs-extra';

const HOTEL_DATA= JSON.parse(readFileSync(path.join(process.cwd(),"data","hotel.json"),'utf-8'));

export  const getHotel=(propertyId)=> {
  return HOTEL_DATA.find(hotel=>hotel.propertyId===propertyId)
}


export default  function handler(req, res) {
  const { query } = req;
  const propertyId = query.propertyId;
  const hotel = getHotel(propertyId)

  if(hotel){
    res.status(200).json({ ...hotel })
  }else{
    res.status(404).json({error:"No Data found"});
  }
}
