## Como executar este Projeto 
    $ docker-compose build
    $ docker-compose up 
 A aplicação ficara disponível para o host de acordo com as vonfigurações do .env.
 FrontEnd - http://localhost:8080/
 ApiGateway - http://localhost:8081/
 AdminerSQL - http://localhost:8082/

 ## Configurações importantes
O arquivo .env na raiz deste repositório contém as variaveis necessárias para subir os serviços, atualize conforme a sua disponibilidade de portas e especialmente o path para o seu diretório local que funcionara como volume para os containers.

