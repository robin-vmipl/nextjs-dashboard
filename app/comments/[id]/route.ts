import { comments } from "../data"
/**
 * Handles the GET request and returns a response with a new comment.
 * 
 * @returns {Promise<Response>} A promise that resolves to a Response object containing the message "New Comment".
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const comment = comments.find(
        (comment) => comment.id === parseInt(params.id)
    );
    return Response.json(comment);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();

    const { text } = body

    const index = comments.findIndex(
        comment => comment.id === parseInt(params.id)
    )

    comments[index].text = text;

    return Response.json(comments[index]);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));

    const deletedComment = comments[index];
    comments.splice(index, 1);

    return Response.json(deletedComment);

}