interface UserRequest {
	name: string;
	email: string;
	password: string;
}

class UserValidator {

	validate({ name, email, password }: UserRequest) {
		if (!this.validateEmail(email)) {
			throw new Error('Email invalido');
		}

		if (!this.validatePassword(password)) {
			throw new Error('Senha invalida');
		}

		if (!this.validateUsername(name)) {
			throw new Error('Username invalido');
		}
	}

	validateUsername(name: string): boolean {
		if (name.length > 30 || name.length < 3) {
			return false;
		}
		if (!/^[a-zA-Z0-9]+$/.test(name)) {
			return false;
		}
		return true;
	}

	validatePassword(password: string): boolean {
		if (password.length < 8) {
			return false;
		}
		if (!/\d/.test(password)) {
			return false;
		}
		if (!/[a-zA-Z]/.test(password)) {
			return false;
		}
		const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		if (!specialCharacters.test(password)) {
			return false;
		}
		if (/\s/.test(password)) {
			return false;
		}
		return true;
	}

	validateEmail(email: string): boolean {
		const emailRegex = /^([a-z0-9.]+)@[a-z]+(\.[a-z]+){1,2}$/i;
		if (emailRegex.test(email)) {
			return true;
		}
		return false;
	}
}

export { UserValidator }