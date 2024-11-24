export type UserSchema = {
	email: string;
	name: string;
	registerNumber: number;
	createdAt: Date;
	role:roleType;
	lastLogin?: Date;
	dept?: string;
	year?: number;
	section?: string;
	phone?: number;
	challengeCompleted?: string[];
};

export type domainSchema = {
	id: string;
	data: domainDataSchema[];
};

export type domainDataSchema = {
	id: string;
	name: string;
	type: challengeType;
};
export enum challengeType {
	'EASY' = 'easy',
	'MEDIUM' = 'medium',
	'HARD' = 'hard'
}

export type challengeSchema = {
	name: string;
	solution: string;
	type: challengeType;
};

export enum roleType {
	'ADMIN' = 'admin',
	'STUDENT' = 'student'
}
