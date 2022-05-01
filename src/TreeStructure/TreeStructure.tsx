import React, { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem } from '@material-ui/lab';
import { Checkbox, FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    checkbox: {
      "&.MuiCheckbox-root": {
        color: "rgba(81, 185, 201, 0.8)"
      },
      "&.MuiCheckbox-colorSecondary": {
        "&.Mui-checked": {
          color: "rgba(7, 38, 255, 1)"
        }
      }
    }
  }));

const TreeStructure = (props:any) =>{
    const [selected, setSelected] = React.useState<string[]>([]);
    const [treeData, setTreeData] = useState(props.dataTree);

    //node is always the root "Parent"
    //id is id of node clicked
    function getChildById(node: any, id: string) {
      let array: string[] = [];
  
      //returns an array of nodes ids: clicked node id and all children node ids
      function getAllChild(nodes: any | null) {
        if (nodes === null) return [];
        array.push(nodes.id);
        if (Array.isArray(nodes.children)) {
          nodes.children.forEach((node:any) => {
            array = [...array, ...getAllChild(node)];
            array = array.filter((v, i) => array.indexOf(v) === i);
          });
        }
        return array;
      }
  
      //returns the node object that was selected
      function getNodeById(nodes:any, id: string) {
        if (nodes.id === id) {
          return nodes;
        } else if (Array.isArray(nodes.children)) {
          let result = null;
          nodes.children.forEach((node:any) => {
            if (!!getNodeById(node, id)) {
              result = getNodeById(node, id);
            }
          });
          return result;
        }
  
        return null;
      }
  
      return getAllChild(getNodeById(node, id));
    }
  
    function getOnChange(checked: boolean, nodes: any) {
    
      //gets all freshly selected or unselected nodes
      // const allNode: string[] = getChildById(treeData, nodes.id);
      const allNode: string[] = getChildById(nodes, nodes.id);
      //combines newly selected nodes with existing selection
      //or filters out newly deselected nodes from existing selection
      let array = checked
        ? [...selected, ...allNode]
        : selected.filter((value) => !allNode.includes(value));
    
      setSelected(array);
    }
  
    const RenderTreeWithCheckboxes = (nodes:any) => {
      const classes = useStyles();
      console.log(nodes.id)
      return (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.some((item) => item === nodes.id)}
                  onChange={(event) =>
                    getOnChange(event.currentTarget.checked, nodes)
                  }
                  //onClick={(e) => e.stopPropagation()}
                  className={classes.checkbox}
                />
              }
              label={<>{nodes.name}</>}
              key={nodes.id}
            />
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node:any) => RenderTreeWithCheckboxes(node))
            : null}
        </TreeItem>
      );
    };
    
    return (
      <>
       
        <TreeView
        className={props.classNamePersonalizada}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["0", "3", "4"]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
         <h3 className={'titulo-entidades-filtro'}>{props.titleFiltro}</h3>
          {
            treeData.map((elements:any)=>(
              RenderTreeWithCheckboxes(elements)
            ))
          }
        </TreeView>
        <br />
      </>
    );
}

export default TreeStructure;