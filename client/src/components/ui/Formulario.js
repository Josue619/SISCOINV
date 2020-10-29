import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 800px;
    width: 95%;
    margin: 5rem auto 0 auto;
    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    input, 
    textarea {
        flex: auto;
        padding: 1rem;
    }
    textarea {
        height: 100px;
    }

    select {
     //background: transparent;
     background-color: var(--gris1);
     border: auto;
     font-size: 120%;
     height: 30px;
     padding: 5px;
     width: 1000px;
     
  }
  
`;

export const InputSubmit = styled.input`
    background-color: var(--gris2);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`;

export const Select = styled.select`
  width: 100%;
  height:35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border:none;
  margin-left: 10px;

       option {
         color: black;
         background: white;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;