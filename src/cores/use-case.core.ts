export interface BaseUseCase<IRequest, IResponse> {
  execute(request: IRequest): Promise<IResponse>;
}
