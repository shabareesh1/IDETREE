import React, { useState } from "react";
import { ArrowDown } from "../assets/icons/arrowDown";
import ArrowRight from "../assets/icons/arrowRight";
import { JsFile } from "../assets/icons/jsFile";
import { CssFile } from "../assets/icons/cssFile";
import { ImageFile } from "../assets/icons/imageFile";
import { DefaultFile } from "../assets/icons/defaultFile";
import { XFile } from "../assets/icons/x";

function GrandChildren({grandchildrenchildren , parent ,getinfo }) {
  const [Childv , Setchildv] =useState(false)
  const haschild = grandchildrenchildren.children ? true : false


  function getid(  clickeditem  ) {
    console.log( parent , clickeditem );
    getinfo(parent, clickeditem )
  }



  return (
    <>
      <li key={grandchildrenchildren.id} style={{marginTop:'18px'}}>
        {haschild && (<span className={"icon-child"}  onClick={()=> Setchildv(Childv => !Childv)}>
          {Childv ? <ArrowDown /> : <ArrowRight /> }
        </span>)}
        <span >
      {grandchildrenchildren.name
      }
        </span>
        <button  className={"btn-style"}  onClick={ () => getid( grandchildrenchildren)}  > <XFile /> </button>

        {haschild && Childv &&  (<div >
          {grandchildrenchildren.children ? grandchildrenchildren.children.map(x =>{
            return  <ul key={x.id} style={{marginTop :"18px"}}>
              <span className={"icon-child"}>
              {x.type === 'file' && (x.name.includes(".js") ?  <JsFile />   :
                ( x.name.includes(".css")   ? <CssFile />  : (x.name.includes(".svg")  ? <ImageFile /> :
                  <DefaultFile />)))}
              </span>
              <span>
           {x.name}
              </span>
              <button  className={"btn-style"}  onClick={ () => getinfo(parent,  grandchildrenchildren , x )}  > <XFile /> </button>
            </ul>
          }) : null}

        </div>)}
          </li>
    </>
  );
}
export default GrandChildren;