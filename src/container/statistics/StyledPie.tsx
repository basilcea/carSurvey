import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import { Container } from "../../shared";
import { ISurveyProps, IPieLabel } from "../../types";

export default function PieStats({ survey, targetables }: ISurveyProps) {
  const [respondents, setRespondents] = useState({
    adolescents: 0,
    unlicensed: 0,
    firstTimers: 0,
    targetables: 0,
  });

  useEffect(() => {
    setRespondents((prev: any) => ({
      ...prev,
      adolescents: survey.filter((single) => Number(single.age) < 18).length,
      unlicensed: survey.filter(
        (single) => single.license && single.license.toUpperCase() !== "YES"
      ).length,
      firstTimers: survey.filter(
        (single) => single.firstCar && single.firstCar.toUpperCase() === "YES"
      ).length,
      targetables,
    }));
  }, [targetables, survey]);

  const RADIAN = Math.PI / 180;
  const totalRespondents = survey ? survey.length : 0;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: IPieLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}% (${(
          percent * totalRespondents
        ).toFixed(0)})`}
      </text>
    );
  };
  const pieData = Object.entries(respondents).map((respondent) => ({
    name: respondent[0],
    value: respondent[1],
  }));
  const colors = ["red", "green", "blue", "orange"];
  return (
    <PieContainer>
      <h4 style={{textAlign: "center"}}> Respondents Distribution </h4>
      <ResponsiveContainer height={400} width="100%">
        <PieChart>
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </PieContainer>
  );
}

const PieContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;
