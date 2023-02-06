import { useEffect, useState } from 'react';
import './index.css';
import { login } from './utils';

// Instruções:
// ! Você tem um formulário de login INCOMPLETO
// ! Não é permitido adicionar novos elementos HTML
// ! Não é permitido usar refs
//
// Tarefas:
// * - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// * - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// * - Desabilite o botão de Login equanto você está executando o login.
// * - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// * - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    handleDisable();
  })

  const handleEmail = (event) => {
    const { value } = event.target;
    //  console.log(event);
    //  console.log(value);
    setEmail(value);
  };

  const handlePassword = (event) => {
    const { value } = event.target;
    // console.log(event);
    // console.log(value);

    setPassword(value);
  };

  const handleDisable = () => {
    const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gmi;

    regexEmail.test(email) || password.length >= 6 ? setIsDisabled(false) : setIsDisabled(true)
  }

  const handleLoginButton = async () => {
    setError(null)
    setIsRequesting(true)

    const loginInfo = {
      email: email,
      password: password,
    };
    // ! await login(loginInfo) - SEM TRY/CATCH aparece erro de 'uncaught in promise'. Com o try/catch tira essa informacao de erro.
    try {
      await login(loginInfo)
      setSuccess('Email e Senha Enviados!')
      alert('login efetuado irmaozao')
      console.log('enviado!')
      setIsDisabled(true)
    } catch (error) {
      setError(error.message)
      setIsDisabled(true)
    } finally {
      setIsRequesting(false)
    }


  }


  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error ? <div className='errorMessage'>{error}</div> : <div className='successMessage'>{success}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} value={email} onChange={handleEmail} autoComplete='off' />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={handlePassword}/>
        </div>

        <div className='button'>
          <button disabled={isDisabled || isRequesting} onClick={handleLoginButton}>Login</button>
        </div>
      </div>
    </div>
  );
}
