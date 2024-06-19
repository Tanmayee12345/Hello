document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('accountForm');
  const accountsList = document.getElementById('accountsList');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      const account = { name, email };

      const response = await fetch('http://localhost:8080/api/accounts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(account)
      });

      if (response.ok) {
          loadAccounts();
          form.reset();
      } else {
          alert('Failed to create account');
      }
  });

  async function loadAccounts() {
      const response = await fetch('http://localhost:8080/api/accounts');
      const accounts = await response.json();

      accountsList.innerHTML = '';
      accounts.forEach(account => {
          const li = document.createElement('li');
          li.textContent = `${account.name} (${account.email})`;
          accountsList.appendChild(li);
      });
  }

  loadAccounts();
});
