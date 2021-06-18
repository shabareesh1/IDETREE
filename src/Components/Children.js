import React from "react";
import {ArrowRight} from "../assets/icons/arrowRight";
import {useState} from "react";
import { ArrowDown } from "../assets/icons/arrowDown";
import {GitFile} from "../assets/icons/gitFile";
import {JsFile} from "../assets/icons/jsFile";
import {ImageFile} from "../assets/icons/imageFile";
import {CssFile} from "../assets/icons/cssFile";
import  { DefaultFile } from "../assets/icons/defaultFile";
import {JsonFile} from "../assets/icons/jsonFile";
import {YarnFile} from "../assets/icons/yarnFile";
import {ReadmeFile} from "../assets/icons/readmeFile";
import {XFile} from "../assets/icons/x";
import GrandChildren from "./GrandChildren";

function Children({children , getinfo}) {

  const [Childv , Setchildv] =useState(false)

  const haschild = children.children ? true : false



  function getid( parent , child, grandchild  ) {
   getinfo( parent ,  child , grandchild )
  }

  return (
    <div  className={"divbutton"}>
      <li  style={{marginTop :"10px"}}>
        {haschild && (<span className={"icon-arrow"} onClick={()=> Setchildv(Childv => !Childv)}>
          {Childv ? <ArrowDown /> : <ArrowRight /> }
        </span>)}
        <span className={"icon-alter"}>
        {children.type === 'file' && (children.name==='.gitignore' ?  <GitFile />   :
          ( children.name ==="README.md"  ? <ReadmeFile />  : (children.name ==="package.json"  ? <JsonFile /> :
            (children.name ==="yarn.lock"  ? <YarnFile /> : <DefaultFile />))))}
        </span>
        {<div className={"icon-name"}>
            <span>{children.name}  </span>
            <button className={"btn-style"} onClick={ () => getid( children)}  >  <XFile /> </button>
          {haschild && Childv && (<div key={children.id} >
            <ul key={children.id} style={{marginTop :"10px"}} >
              {children.children.map(x =>{
                return ( x.children ? (<GrandChildren key={x.id}   getinfo={( parent  , child , grandchild  ) => getid( parent , child , grandchild)}  parent = {children}  grandchildrenchildren={x} /> )  : (<li key={x.id} style={{marginTop :"18px"}} >
                      <span className={"icon-child"}>
                      {x.type === 'file' && (x.name.includes(".js") ?  <JsFile />   :
                        ( x.name.includes(".css")   ? <CssFile />  : (x.name.includes(".svg")  ? <ImageFile /> :
                          <DefaultFile />)))}
                      </span>
                      <span> {x.name} </span>
                    <button  className={"btn-style"}  onClick={ () => getid( children , x )} > <XFile /> </button>
                    </li>
                   ))
              })}
            </ul>
          </div>)}
        </div>}
      </li>
    </div>
  );
}




export default Children;