    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    const telaAcerto = document.getElementById('telaAcerto');
    const telaErro = document.getElementById('telaErro');
    const mensagemFinal = document.getElementById('mensagemFinal');



    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      telaAcerto.className = 'mensagem invisivel';
      telaErro.className = 'mensagem invisivel';
      // Remove todas as imagens de erro anteriores
      let imagensErro = document.querySelectorAll('#imagemErro');
      imagensErro.forEach(img => img.remove());


      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2 ou 3
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
          //alteramos a classe css das divs 0, 1, 2 e 3 (className)
          divis[i].className = "inicial";
        }
      }

      //armazenamos a imagem do Smile na variável imagem (getElementById)
      let imagem = document.getElementById("imagem");
      //se a imagem nao for vazia (se ela existir)
      if (imagem != "") {
        //removemos a imagem do Smile
        imagem.remove();
      }
    }

    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Sayonaras encontradas: " + acertos + " Tentativas: " + tentativas + " Reputação: " + Math.round(desempenho) + "%";

    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "sayonara.png";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }

    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
    function verifica(obj) {
      //se jogar é verdadeiro
      if (jogar) {
        //jogar passa a ser false
        jogar = false;
        //incrementa as tentativas
        tentativas++;
        //verifica se jogou 100 vezes
        if (tentativas == 100) {
          //oculta o botao joganovamente alterando a classe css (getElementById e className)
          btnJogarNovamente.className = 'invisivel';
          //mostra o botao reiniciar alterando a classe css (getElementById e className)
          btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 4);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
        acertou(obj);
        acertos++;
        telaAcerto.className = 'mensagem visivel';
        telaErro.className = 'mensagem invisivel';
      } else {
        obj.className = "errou";

        // Cria uma imagem de erro e adiciona na carta errada
        const imgErro = new Image(100);
        imgErro.src = "https://thumbs.dreamstime.com/z/sapo-um-mutante-est%C3%A1-diante-de-voc%C3%AA-metade-do-e-humano-esta-criatura-verde-humor%C3%ADstica-humanoide-parece-algo-bem-vis%C3%ADvel-filme-219231620.jpg?ct=jpeg"; // nome da sua imagem de erro
        imgErro.id = "imagemErro"; // um ID para facilitar a remoção depois
        obj.appendChild(imgErro);

        // Mostra onde estava o smile
        const objSorteado = document.getElementById(sorteado);
        acertou(objSorteado);
        telaErro.className = 'mensagem visivel';
        telaAcerto.className = 'mensagem invisivel';
}

        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
      } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);