document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('formLogin');
  const formCadastroUsuario = document.getElementById('formCadastroUsuario');

  if (formLogin) {
    formLogin.addEventListener('submit', (event) => {
      event.preventDefault();
      hideAlert('alertaLogin');

      const email = document.getElementById('emailLogin').value.trim().toLowerCase();
      const password = document.getElementById('senhaLogin').value;
      const user = getUsers().find(item => item.email.toLowerCase() === email && item.password === password);

      if (!user) {
        showAlert('alertaLogin', 'E-mail ou senha inválidos.', 'error');
        return;
      }

      setSession(user);
      window.location.href = 'produtos.html';
    });
  }

  if (formCadastroUsuario) {
    formCadastroUsuario.addEventListener('submit', (event) => {
      event.preventDefault();
      hideAlert('alertaCadastroUsuario');

      const name = document.getElementById('nomeUsuario').value.trim();
      const email = document.getElementById('emailUsuario').value.trim().toLowerCase();
      const password = document.getElementById('senhaUsuario').value;
      const users = getUsers();

      if (users.some(item => item.email.toLowerCase() === email)) {
        showAlert('alertaCadastroUsuario', 'Já existe um usuário cadastrado com este e-mail.', 'error');
        return;
      }

      users.push({ id: crypto.randomUUID(), name, email, password });
      saveUsers(users);
      showAlert('alertaCadastroUsuario', 'Usuário cadastrado com sucesso. Você já pode fazer login.', 'success');
      formCadastroUsuario.reset();
    });
  }
});
