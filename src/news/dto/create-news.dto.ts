export class CreateNewsDto {
    readonly name: string;
    readonly content: string;
    readonly imgHref: string;
    readonly date: Date;
}