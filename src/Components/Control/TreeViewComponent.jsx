import * as React from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useMemo, useEffect } from "react";
import httpService from "../../API/HttpService/httpService";
import { API_PATH } from "../../Constants/config";
export default function TreeViewComponent() {
  const [treeNodes, setTreeNodes] = React.useState([]);
  useEffect(() => {
    httpService.get(API_PATH.GET_PARENT_VENDOR).then((response) => {
      setTreeNodes(response.data);
      console.log("Test", response.data);
    });
  }, []);
  const renderTree = (nodes) => (
    <TreeItem key={nodes.vendor_id} nodeId={nodes.vendor_id} label={nodes.vendor_name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, overflowY: "auto" }}
    >
      {/* {
        renderTree(treeNodes)
      } */}
        <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem> 
    </TreeView>
  );
}
