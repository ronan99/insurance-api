import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { CalculateQuoteController } from './CalculateQuoteController'
import { CalculateQuoteUseCase } from './CalculateQuoteUseCase'

const calculateQuoteController: CalculateQuoteController = container.get<CalculateQuoteController>(Types.CalculateQuoteController)
const calculateQuoteUseCase: CalculateQuoteUseCase = container.get<CalculateQuoteUseCase>(Types.CalculateQuoteUseCase)

export { calculateQuoteController, calculateQuoteUseCase }
