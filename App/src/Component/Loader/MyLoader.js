import React from "react";
import { Dimensions } from "react-native";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const iWidth = (width / 2) - 9;

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#d4d4d4"
    foregroundColor="#676565"
    {...props}
  >
    <Rect x="10" y="8" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="8" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="10" y="122" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="122" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="10" y="238" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="238" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="10" y="348" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="348" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="10" y="460" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="460" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="10" y="566" rx="0" ry="0" width={iWidth} height="120" />
    <Rect x="180" y="566" rx="0" ry="0" width={iWidth} height="120" />
  </ContentLoader>
)

export { MyLoader }; 