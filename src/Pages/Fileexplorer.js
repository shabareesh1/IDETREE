import React, { Component } from "react";
import Children  from "../Components/Children";


import api from '../api'
class Fileexplorer extends Component {
  state={
    filestree: {},
    loaded : false
  }
 async componentDidMount() {
     await api.getDirectoryTree().then(data => {
       this.setState({
         filestree : data,
         loaded : true
       } , () =>{
        console.log(this.state.filestree);
       })
     })
   }

   getInfo =( parent , child  , grandchild) =>{

     console.log( child);
     if( child !== undefined && child.type=== 'file' && parent.children && grandchild === undefined) {

       const dummy = { ...this.state.filestree }

       const children = dummy.children.find(item => item.id === parent.id).children.filter(x => x.id !== child.id)

       dummy.children.find(item => item.id === parent.id).children = children
       console.log(dummy);

       this.setState({ filestree: dummy })

     }

     if(parent.type === 'folder' | parent.type === 'file' && child === undefined ){

       const dummy = { ...this.state.filestree }

     const updatedparent =  dummy.children.filter( item =>
       item.id !== parent.id
       )
       dummy.children =  updatedparent

       this.setState({
         filestree : dummy
       })
     }


     if(child !== undefined && child.type==='folder'  && grandchild === undefined) {
       const dummy = { ...this.state.filestree }
       const updatedchild =  dummy.children.find(item => item.id === parent.id).children.filter(x => x.id !== child.id)
       dummy.children.find(item => item.id === parent.id).children = updatedchild
       this.setState({ filestree: dummy })

     }
     if(grandchild !== undefined  ){

       const dummy = { ...this.state.filestree }

       const updatedchild =  dummy.children.find(item => item.id === parent.id).children.find(x=> x.id === child.id ).children.filter( x=> x.id !== grandchild.id )

       dummy.children.find(item => item.id === parent.id).children.find(x => x.id === child.id).children = updatedchild ;
       this.setState({ filestree: dummy })
     }


   }


  render() {
    var {filestree , loaded} = this.state
    if(!loaded ){
 return <div>
   im loading.....
 </div>
    }
    else {
      return (
        <div  className={"mainContent"}>
        <div style={{ margin: '20px' ,padding:'20px', backgroundColor:'#605F61'}}>
          {filestree.name}
        </div>
        <ul>

          {this.state.filestree.children.length >  0  ?  filestree.children.map( item =>
            <Children key={item.id} getinfo={( parent  , child , grandchild  ) => this.getInfo( parent , child , grandchild)}  children={item}/>
          ) : null}
        </ul>
        </div>

      );
    }
  }
}


export default Fileexplorer;