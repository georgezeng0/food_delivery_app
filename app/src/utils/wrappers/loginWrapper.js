import styled from "styled-components"

export default styled.main`
padding: var(--nav-height) 0px 0px;
height: calc(100vh - var(--nav-height) );
display: flex;
justify-content: center;
align-items: center;
min-width: 300px;
img{
  top: 0;
  min-width: 300px;
  min-height: 100vh;
  width: 100%;
  object-fit: cover;
  position: absolute;
}
.central-container{
  margin-bottom: var(--nav-height);
  z-index: 0;
  height: fit-content;
  border-radius: 15px;
  overflow: hidden;
  width: 500px;
  box-shadow: 0px 0px 5px 5px var(--primary-1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
  text-align: center;
 }
}
h1{
  margin: 0;
  padding: 15px;
  text-align: center;
  background-color: var(--primary-2);
  color: white;
  width: 100%;
}
.form-container{
  padding: 22px;
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  button{
    margin-top: 30px;
  }
}
.form-row{
  margin-top: 20px;
  width: 300px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 label{
  width: 100%;
  text-align: end;
  padding-right: 10px;
 }
 
}
`