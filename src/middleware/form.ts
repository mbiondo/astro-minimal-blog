import type { APIContext, MiddlewareNext } from "astro"

export async function form(context: APIContext<Record<string, any>, Record<string, string | undefined>>, next: MiddlewareNext) {
	console.log("Form middleware")

	context.locals.formValues = JSON.parse(context.cookies.get("formValues")?.value ?? "{}")
	context.locals.formErrors = JSON.parse(context.cookies.get("formErrors")?.value ?? "{}")
	return await next()
}
