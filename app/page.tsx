"use client";

import {useState, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import "./../app/app.css";
import {Amplify} from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

// Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
    const [networks, setNetworks] = useState<Array<Schema["Network"]["type"]>>([]);
    const [articles, setArticles] = useState<Array<Schema["Article"]["type"]>>([]);

    function listTodos() {
        client.models.Network.observeQuery().subscribe({
            next: (data) => setNetworks([...data.items]),
        });
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Network.create({
            id: '1',
            name: "Todo content",
            type: 'Type',
            sort:1,
        });
    }

    return (
        <main>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {networks.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br/>
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                    Review next steps of this tutorial.
                </a>
            </div>
        </main>
    );
}
