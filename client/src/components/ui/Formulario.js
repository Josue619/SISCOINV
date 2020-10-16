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
     background: transparent;
     background-color: var(--gris1);
     border: none;
     font-size: auto;
     height: 30px;
     padding: 5px;
     width: 250px;
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