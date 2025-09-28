
function loadFeedbacksFromStorage() {
  if (typeof window !== 'undefined') {
  }
  return [];
}
let feedbacks = [];
export async function GET(request) {
  return Response.json(feedbacks);
}

export async function POST(request) {
  try {
    const { name, email, feedback } = await request.json();

    if (!name || !email || !feedback) {
      return Response.json({ error: 'All fields are required!' }, { status: 400 });
    }

    const newFeedback = {
      id: Date.now(), 
      name,
      email,
      feedback,
      date: new Date().toISOString(), 
    };

    feedbacks.push(newFeedback);

    return Response.json({ message: 'Feedback submitted successfully!', feedback: newFeedback }, { status: 201 });
  } catch (error) {

    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}