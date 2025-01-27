import { comments } from "../data"
/**
 * Handles the GET request and returns a response with a new comment.
 * 
 * @returns {Promise<Response>} A promise that resolves to a Response object containing the message "New Comment".
 */
export async function GET(_req: Request, context: { params: { id: string } }) {
    // Await `params` since it may be asynchronous
    const params = await context.params;
    const { id } = params;

    const comment = comments.find((comment) => comment.id === parseInt(id, 10));

    if (!comment) {
        return new Response(JSON.stringify({ error: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(comment), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const params = await context.params; // Await params
    const { id } = params;

    const body = await req.json();
    const { text } = body;

    const index = comments.findIndex((comment) => comment.id === parseInt(id, 10));

    if (index === -1) {
        return new Response(JSON.stringify({ error: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    comments[index].text = text;

    return new Response(JSON.stringify(comments[index]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}


export async function DELETE(req: Request, context: { params: { id: string } }) {
    const params = await context.params; // Await params
    const { id } = params;

    const index = comments.findIndex((comment) => comment.id === parseInt(id, 10));

    if (index === -1) {
        return new Response(JSON.stringify({ error: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const deletedComment = comments[index];
    comments.splice(index, 1);

    return new Response(JSON.stringify(deletedComment), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
