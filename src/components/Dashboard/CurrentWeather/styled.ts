import styled from 'styled-components';

export const WeatherContainer = styled.div`
  background-color: #FFFFFF;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.125rem;
  color: #727E8E;
`;
export const CurrentWeatherContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 300px) {
    justify-content: flex-start;
  }
`;
export const CurrentWeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1.5rem;
  width: 25rem;

  @media (max-width: 800px) {
    margin: 2rem 0rem;
  }

  h4 {
    font-weight: 500;
    font-size: 3.25rem;
    color: #396bae;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  span {
    font-weight: 500;
    font-size: 7rem;
    color: #4a6fa1;
    margin-left: 1rem;
    line-height: 1;
    sup {
      line-height: 0;
    }
  }
  h6 {
    font-size: 1.375rem;
    text-align: left;
    color: #7b98b2;
    margin-bottom: 1rem;
  }
`;
export const CurrentWeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
  margin-left: 1rem;
`;
export const FeelsLike = styled.p`
  font-size: 1.25rem;
  color: #4a6fa1;
`;
export const HighLowContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 2rem;
`;
export const WeatherDegree = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.25rem;
  color: #3a86ca;
  margin-top: 0.8rem;
  margin-right: 2.5rem;
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
  }
`;
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.8rem;
  div {
    color: ${({ theme }) => theme.smallIconTextColor};
    display: flex;
    align-items: center;
    font-size: 1rem;
    width: 8rem;
  }
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
    width: 1.6rem;
    margin-left: -0.3rem;
  }
  span {
    color: #3080c8;
    font-weight: 500;
    font-size: 1rem;
  }
`;
