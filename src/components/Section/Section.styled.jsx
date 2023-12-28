import styled from 'styled-components';

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${props => props.theme.space[4]}px;
  padding-bottom: ${props => props.theme.space[4]}px;

  max-width: 100%;
  width: 600px;

  background-color: #4bc3fa41;
  text-shadow: 1px 1px 0 #fff;
  box-shadow: -0.5px -0.5px 0.5px #fff, 1px 1px 1px #babecc;
 
`;
