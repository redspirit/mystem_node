# mystem_node
Wrapper for Yandex MyStem

**Request:**

POST JSON :4000  
`{
    text: "Приветствую, как твои дела?"
}`

**Response:**

`{`   
`    text: "Приветствую, как твои дела?",`    
`    analisys: {...},`     
`    words: "приветствовать как твой дело"`       
`}`