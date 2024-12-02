# Contributing

## Descrição

Ionic conversor é um aplicativo que auxilia no acompanhamento de variações de moedas
e câmbio. Ele permite que você faça conversão de moedas, manter um histórico das últimas
conversões e acompanhar as variações cambiais durante o tempo.

![Logo do Ionic Conversor](./src/assets/logoMobile.png)

## Como Baixar

Como qualquer projeto público no github, basta usar a linha de comando para fazer um clone.

```sh
git clone git@github.com:AngeloRafaelbr/IonicConversor.git
```

```sh
git clone https://github.com/AngeloRafaelbr/IonicConversor.git
```

## Pré-requisitos

- node: ^20.x.x
- npm
- ionic CLI: ^7.2.0
- Android Studio

## Como rodar o projeto (lista de comandos)

Como rodar o projeto:

1. Instale as dependências

```sh
npm i
```

2. Inicialize a plataforma android no projeto

```sh
ionic capacitor add android
```

3. Realize o build do projeto

```sh
ionic build
```

4. Realize um sync do build de ionic para android

```sh
ionic capacitor sync android
```

5. Abra o Android Studio para inicializar o aplicativo

```sh
ionic capacitor open android
```

## Gitflow escolhido

1. Fork do Projeto

Para contribuir com o projeto, o recomendado é que cada contribuidor faça um [Fork](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
pela própria UI do github no [repositório do projeto](https://github.com/AngeloRafaelbr/IonicConversor).

2. Criação de Branch de Trabalho

Depois que você fizer seu fork e tiver o projeto em sua máquina, use o git para criar sua branch
de trabalho. `git checkout -B <nome-da-branch>`.

3. Adicionando seu Trabalho e Subindo no Seu Repositório Remoto

Depois que você concluir suas modificações, utilize os comandos
- `git add <lista-de-arquivos>`
- `git commit -m "mensagem do commit"`
- `git push --set-upstream origin <nome-da-branch>`

Ao fazer isso, todas as sua modificações estarão disponíveis no seu fork de repositório github.

4. Crie um Pull Request Apontando Para Branch Remota

Depois de subir seu código na sua branch remota, você pode criar uma Pull Request, solicitando que
os donos do repositório original incorporem as mudanças que você fez.

Mais detalhes [aqui](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).