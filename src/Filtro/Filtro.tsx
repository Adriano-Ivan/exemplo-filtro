import { useState } from "react";
import TreeStructure from "../TreeStructure/TreeStructure";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import './Filtro.styles.css';

const dataComida =[
 {
    id:'root',
    name:'Churrasco',
    children:[
      {
        id:'1',
        name:'Picanha'
      },
      {
        id:'3',
        name:'Peixe',
        children: [
          {
            id:'4',
            name:'Frito'
          },
          {
            id:'5',
            name:'Assado'
          },
        ]
      }
    ]
  },
  {
    id:'root2',
    name:'Frutas',
    children:[
      {
        id:'6',
        name:'Pera'
      },
      {
        id:'7',
        name:'Maçã',
        children: [
          {
            id:'8',
            name:'Vermelha'
          },
          {
            id:'8',
            name:'Verde'
          },
        ]
      }
    ]
  }
];

const dataBebida =[
    {
       id:'root',
       name:'Sucos',
       children:[
         {
           id:'1',
           name:'Laranja'
         },
         {
           id:'2',
           name:'Silvestres',
           children: [
             {
               id:'3',
               name:'Amoras'
             },
             {
               id:'4',
               name:'Coco'
             },
           ]
         }
       ]
     },
     {
       id:'root2',
       name:'Alcoólicas',
       children:[
         {
           id:'6',
           name:'Vinho'
         },
         {
           id:'7',
           name:'Whiskey',
           children: [
             {
               id:'8',
               name:'Escocês'
             },
             {
               id:'8',
               name:'Irlandês'
             },
           ]
         }
       ]
     },
     {
        id:'root2',
        name:'Artesanais',
        children:[
          {
            id:'6',
            name:'Cerveja texana'
          },
          {
            id:'7',
            name:'Essência de ervas doces da Islândia',
            children: [
              {
                id:'8',
                name:'extremo norte'
              },
              {
                id:'8',
                name:'extremo sul'
              },
            ]
          }
        ]
      }
];


const Filtro = () =>{
    return (
        <section className={'container-area-Filtro'} >
            <h2 className='title-container-Filtro'>Filtro</h2>
            <div className={'area-Filtro'}>
            <TreeStructure classNamePersonalizada={'comida-Filtro'} dataTree={dataComida}></TreeStructure>
            <TreeStructure classNamePersonalizada={'bebida-Filtro'} dataTree={dataBebida}></TreeStructure>
            </div>
            <div className={'container-button-filtro'}>
              <Button variant="contained" className={'botao-filtrar'} >Filtrar</Button>
            </div>
        </section>
    )
}

export default Filtro;