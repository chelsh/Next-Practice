import { NextRequest, NextResponse } from "next/server";
import client from "../../../../lib/server/client";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  const tasks = await client.task.findMany();

  // Do whatever you want
  return NextResponse.json({ tasks: tasks }, { status: 200 });
}

export async function POST(request: NextRequest) {
  // Do whatever you want

  const body = await request.json();

  const content = body.content;

  if (!content) {
    NextResponse.json({ status: 400 });
  }

  await client.task.create({
    data: {
      content,
      status: "todo",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
