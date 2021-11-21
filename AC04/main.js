function GetMsg(u1, u2, painel_de_saida) {
    const xhttp = new XMLHttpRequest();
  
    //Ao executar uma solicitação xhttp.open("GET"..)..xhttp.send() assincrona,
    //deve-se especificar uma função de callback, que é a seguinte:
    xhttp.onreadystatechange = function() { //Function chamada ao receber resposta
      if( this.readyState === XMLHttpRequest.DONE && this.status === 200 ) {
        resposta = JSON.parse(this.responseText);
        mensagens = JSON.parse(resposta["body"]);
  
        painel_de_saida.value = "";
        for( i = 0; i < mensagens.length; i++ )
          painel_de_saida.value += '(' + String(i + 1) + ') ' +
          mensagens[i]["data_hora"] + '\n' + mensagens[i]["msg"] + '\n\n';
      }
    }
  
    /*-------------------------------------------------------------------------*/
  
    //Na solicitação GET, os dados vão no cabeçalho (header)
    var consulta = "?from=" + u1.value + "&to=" + u2.value
    xhttp.open("GET", url + consulta); //GET: a consulta vai no cabeçalho com a URL
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
  }  // Fim de GetMsg
  
  /*---------------------------------------------------------------------------*/
  
  function PostMsg() {
    //Na solicitação POST, os dados vão no corpo (body).
    var corpo = JSON.stringify( // Passa para JSON em texto.
      { "from": document.getElementById("usr1").value, // Usuario Local
        "to"  : document.getElementById("usr2").value, // Usuario Remoto
        "msg" : document.getElementById("msg").value } );
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(corpo);
  
    //Pega as mensagens de usr1 para usr2 e coloca no painel da esquerda
    GetMsg(document.getElementById("usr1"), document.getElementById("usr2"),
      document.getElementById("from"));
  
    //Pega as mensagens de usr1 para usr2 e coloca no painel da direita
    GetMsg(document.getElementById("usr2"), document.getElementById("usr1"),
      document.getElementById("to"));
  
    document.getElementById("msg").value = "";
    document.getElementById("msg").focus(); // Coloca o foco na entrada
  }  // Fim de PostMsg
  url = "https://n08o2kjckf.execute-api.us-east-1.amazonaws.com/PrimeiroEstagio"