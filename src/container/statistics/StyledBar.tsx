import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { Container } from "../../shared";
import { ISurveyProps, ILineLabel} from "../../types";

export default function BarStats({ survey, targetables }: ISurveyProps) {
  const [responses, setResponses] = useState({
    fuelEmissionConcern: 0,
    "DriveTrain - FWD/I dont Know": 0,
  });
  useEffect(() => {
    
    survey && setResponses((prev: any) => ({
      ...prev,
      fuelEmissionConcern: survey.filter(
        (single) =>
          single.fuelEmissionsWorries &&
          single.fuelEmissionsWorries.toUpperCase() === "NO"
      ).length,
      "DriveTrain - FWD/I dont Know": survey.filter(
        (single) =>
          single.driveTrain && single.driveTrain.toUpperCase() === "RWD"
      ).length,
    }));
  },[survey]);
  const customizedLabel = ({ x, y, fill, value }: ILineLabel) => {
    return (
      <text
        x={x}
        y={y}
        dy={20}
        fontSize="16"
        fontFamily="sans-serif"
        fill={fill}
        textAnchor=""
      >
        {`${targetables && (value * 100/ targetables).toFixed(0)}% (${value})`}
      </text>
    );
  };

  
  const lineData = Object.entries(responses).map((response) => ({
    name: response[0],
    NO: response[1],
    YES: targetables && targetables - response[1],
  }));

  return (
    <BarContainer>
      <h4 style={{textAlign: "center"}}> Others </h4>
    <BarChart width={600} height={250} data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="YES" fill="#8884d8" label={customizedLabel} />
      <Bar dataKey="NO" fill="#82ca9d" label={customizedLabel} />
    </BarChart>
    </BarContainer>
  );
}

const BarContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;