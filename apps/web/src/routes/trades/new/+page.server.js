import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();

		formData.append('user', locals.user.id);

        formData.append('Symbol', formData.get('Symbol').toUpperCase());

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        formData.append('Open_Date', formattedDate);
        
        formData.append('Open_Trade', 'True');

        const formDataObject = {};
        formData.forEach((value, key) => {
        formDataObject[key] = value;
        });
        console.log('formData: ', formDataObject);


        try {
			await locals.pb.collection('Trade_Inputs').create(formData);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};