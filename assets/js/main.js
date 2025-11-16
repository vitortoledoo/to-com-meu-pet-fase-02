// assets/js/main.js
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js carregado com sucesso");

    // ========== Função de validação Bootstrap ==========
    const aplicarValidacao = (form, callbackSucesso) => {
      if (!form) return;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          console.log(" Formulário inválido:", form.id);
          return;
        }

        console.log(" Formulário válido:", form.id);
        form.classList.remove("was-validated");
        form.reset();

        // Remove estados visuais
        form.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });

        // Chama a função de sucesso se existir
        if (typeof callbackSucesso === "function") callbackSucesso();
      });

      // Feedback em tempo real
      form.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.addEventListener("input", () => {
          if (!form.classList.contains("was-validated")) return;
          campo.classList.toggle("is-invalid", !campo.checkValidity());
          campo.classList.toggle("is-valid", campo.checkValidity());
        });
      });
    };

    // ========== Cadastro ==========
    const formCadastro = document.querySelector("#formCadastro");
    if (formCadastro) {
      const msgCadastro = document.querySelector("#msgCadastro");

      aplicarValidacao(formCadastro, () => {
        msgCadastro.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
             Cadastro realizado com sucesso!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
          </div>`;
      });
    }

    // ========== Agendamento ==========
    const formAgendamento = document.querySelector("#formAgendamento");
    const telebuscaRadio = document.querySelector("#telebusca");
    const localRadio = document.querySelector("#local");
    const blocoEndereco = document.querySelector("#blocoEndereco");

    // Exibe ou esconde o endereço conforme a escolha
    const toggleEndereco = () => {
      if (!blocoEndereco) return;
      const ativo = telebuscaRadio && telebuscaRadio.checked;
      const campos = blocoEndereco.querySelectorAll("input, select, textarea");

      if (ativo) {
        blocoEndereco.classList.remove("d-none");
        campos.forEach((el) => {
          el.disabled = false;
          if (el.dataset.requiredWhen === "telebusca") el.required = true;
        });
      } else {
        blocoEndereco.classList.add("d-none");
        campos.forEach((el) => {
          el.disabled = true;
          el.required = false;
          el.value = "";
          el.classList.remove("is-valid", "is-invalid");
        });
      }
    };

    if (telebuscaRadio && localRadio) {
      telebuscaRadio.addEventListener("change", toggleEndereco);
      localRadio.addEventListener("change", toggleEndereco);
      toggleEndereco();
    }

    if (formAgendamento) {
      aplicarValidacao(formAgendamento, () => {
        const container = document.createElement("div");
        container.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
             Agendamento confirmado com sucesso!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
          </div>`;
        formAgendamento.appendChild(container);
      });
    }

    // ========== Bloquear datas passadas ==========
    const dtServico = document.querySelector("#dtServico");
    if (dtServico && dtServico.type === "datetime-local") {
      const agora = new Date();
      const yyyy = agora.getFullYear();
      const mm = String(agora.getMonth() + 1).padStart(2, "0");
      const dd = String(agora.getDate()).padStart(2, "0");
      const hh = String(agora.getHours()).padStart(2, "0");
      const min = String(agora.getMinutes()).padStart(2, "0");
      dtServico.min = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }
  });
})();
