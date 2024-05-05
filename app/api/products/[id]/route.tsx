import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

interface Props {
	params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!product)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else return NextResponse.json(product);
}

export async function PUT(request: NextRequest, props: Props) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 404 });
	const product = await prisma.product.findUnique({
		where: { id: parseInt(props.params.id) },
	});
	if (!product)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else {
		const updatedProduct = await prisma.product.update({
			where: { id: product.id },
			data: { name: body.name, price: body.price },
		});
		return NextResponse.json(updatedProduct);
	}
}

export async function DELETE(request: NextRequest, props: Props) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(props.params.id) },
	});
	if (!product)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else {
		const deletedProduct = await prisma.product.delete({
			where: { id: parseInt(props.params.id) },
		});
		return NextResponse.json(deletedProduct);
	}
}
