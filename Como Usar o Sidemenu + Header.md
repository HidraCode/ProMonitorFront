## Como Usar o Sidemenu + Header

Eu estruturei esses dois componentes separadamente, se olharem na pasta de components, há 3 arquivos que compôem esses componentes:

AppHeader.jsx
Sidemenu.jsx
SidemenuItem.jsx

irei explicar nesse arquivo as props de cada um deles e um exemplo pratico de como usar seu proprio header e sidemenu personalizados para a página

#### AppHeader - props: 
**logoColor** (feito para se colocar a cor da logo desejada, se ficar vazio, será branco);
**sideMenu** (chama o sideMenu, se ficar vazio, não haverá sideMenu);
**buttons** (botões anexados ao final do menu, podem ser quaisquer botões, sejam ele de login ou até um botão de perfil)

#### Sidemenu - props:
**items** (quais serão os  items do sideMenu, cada um dos botões individuais, os itens são do tipo SidemenuItem)

#### SidemenuItem - props:
**icon** (icone do botão)
**label** (o que está escrito no botão)

#### Exemplo de uso:

```jsx
// declare um array de botões para o header
const headerButtons = [
	<button>botão 1</button>
	<button>botão 2</button>
	...
]

// declare um array de sideMenuItems para o sideMenu lembre de adicionar o icon e a label
const sideMenuButtons = [
	<SidemenuItem icon={<HomeOutlined/>} label={"item1"} />
	<SidemenuItem icon={<UserOutlined/>} label={"item2"} />
	...
]

// Agora basta usar os arrays declarados no header
return(
	<AppHeader 
		logoColor={logoWhite} 
		sideMenu={<sideMenu items={sideMenuButtons} />}
		buttons={headerButtons}  
	/>
)
```

Caso não queira usar algum dos items acima, por exemplo, não quero botões no header, use sempre a propriedade `null` por boas práticas e melhor legibilidade, exemplo:

```jsx
return(
	<AppHeader 
		logoColor={logoWhite} 
		sideMenu={<sideMenu items={sideMenuButtons} />}
		buttons={null}  
	/>
)
```

