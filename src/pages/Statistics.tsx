import WithLogoBackground from "../WithLogoBackgroundHoc";
import { Fragment, useEffect, useState } from "react";
import { ISurveyState } from "../types";
import styled from "styled-components";
import { Container, Label, StyledLink } from "../shared";
import { BarStats,  PieStats } from "../container";

const Statistics = () => {
  const data = localStorage.getItem("localSurveyData");
  const surveyData = data && (JSON.parse(data) as ISurveyState[]);
  const [survey, setSurvey] = useState<ISurveyState[]>(surveyData || []);
  const [carsData, setCarsData] = useState({
    targetables: 0,
    sumOfCars: 0,
  });
  
  
  useEffect(() => {
    
    surveyData &&
      setCarsData((prev: any) => ({
        ...prev,
        targetables:
          surveyData &&
          surveyData.filter((single) => single.numberOfCars).length,
        sumOfCars:
          surveyData &&
          surveyData
            .filter((single) => single.numberOfCars)
            .map((single) => single.numberOfCars)
            .reduce((total, sum) => Number(total) + Number(sum), 0),
      }));
  }, []);
  const carsAverage = carsData.targetables
    ? carsData.sumOfCars / carsData.targetables
    : 0;

  return (
    <StatisticsContainer>
      <Header> Car Sales Survey - Results Summary</Header>
      {survey.length > 0 ? <Fragment>
      <ChartsContainer>
        {<PieStats survey={survey} targetables={carsData.targetables} />}
        {<BarStats survey={survey} targetables={carsData.targetables} />}
        
      </ChartsContainer>
   
      <h4> {`Average Amount of Cars In A Family : ${carsAverage.toFixed(1)}`} </h4>
      </Fragment>: <Label style={{marginTop: "5%"}}>No Available Result</Label>}
      <StyledLink to="/">Go to Survey</StyledLink>
    </StatisticsContainer>
  );
};

export default WithLogoBackground(Statistics);

const StatisticsContainer = styled(Container)`
  width: 100%;
  align-items: center;
`;

const ChartsContainer = styled(Container)`
  flex-direction: row;
  height: 80%;
  width: 80%;
  margin: 5% 10%;

  align-items: center;
`;

export const Header = styled.h2`
  font-size: 2em;
  width: 80%;
  margin: 0% 10%;
  color: blue;
  text-align: center;
`;

