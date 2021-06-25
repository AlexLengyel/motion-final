import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 200px;

  .my-masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-masonry-grid_column {
    background-clip: padding-box;
    margin: 20px 10px;
  }

  .my-masonry-grid_column > div {
    background: ${props => props.theme.white};
    width: 360px;
    height: 400px;
    background: #FFFFFF;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: 4px;
  }
`
