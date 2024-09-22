Khi phát triển một ứng dụng thương mại điện tử (**Ecommerce**) theo mô hình **Domain-Driven Design (DDD)**, cần phải tuân thủ một quy trình logic rõ ràng, từ việc hiểu rõ nghiệp vụ đến việc thiết kế hệ thống và triển khai. Dưới đây là các bước chi tiết cần làm để phát triển một ứng dụng **Ecommerce** theo DDD.

### 1. **Hiểu rõ Domain và Xác định Boundaries**

#### a. **Xác định Domain của dự án**
- Xác định phạm vi chính của ứng dụng thương mại điện tử, bao gồm các nghiệp vụ cốt lõi như quản lý sản phẩm, đặt hàng, thanh toán, và vận chuyển.
- Thảo luận với các bên liên quan để hiểu rõ các yêu cầu nghiệp vụ, mục tiêu kinh doanh, và các quy tắc cần tuân theo.

#### b. **Xác định Bounded Contexts**
- **Bounded Context** là các phần nhỏ của domain. Trong ứng dụng Ecommerce, có thể chia nhỏ thành các context như:
  - **Product Catalog**: Quản lý sản phẩm, danh mục, chi tiết sản phẩm.
  - **Order Management**: Quản lý quy trình đặt hàng, xử lý đơn hàng.
  - **Payment**: Xử lý thanh toán và các phương thức thanh toán.
  - **Shipping**: Quản lý giao hàng và tính toán chi phí giao hàng.
  - **Customer Management**: Quản lý thông tin và tài khoản khách hàng.

#### c. **Xác định các Entity và Value Objects chính**
- **Entity**: Những đối tượng có định danh duy nhất trong domain, ví dụ: **Product**, **Customer**, **Order**, **Payment**, **Shipping**.
- **Value Objects**: Những đối tượng không có định danh, nhưng có giá trị quan trọng, ví dụ: **Address**, **Money**, **Discount**.

#### d. **Xác định các Aggregate**
- **Aggregate** là các nhóm Entity và Value Objects liên kết chặt chẽ với nhau, được quản lý bởi một **Aggregate Root**. Ví dụ:
  - **Order Aggregate**: Bao gồm các đối tượng **Order**, **OrderLine**, **ShippingDetails**.
  - **Customer Aggregate**: Bao gồm **Customer**, **Address**, **PaymentDetails**.

### 2. **Thiết kế Ubiquitous Language và Domain Model**

#### a. **Xây dựng Ubiquitous Language**
- Tạo ra một ngôn ngữ thống nhất mà tất cả thành viên trong đội (bao gồm cả các bên liên quan phi kỹ thuật) có thể sử dụng để nói về domain. Ví dụ: **Product**, **Checkout**, **Shipping**, **Discount**, **Order**.
- Đảm bảo tất cả các thành viên hiểu rõ và sử dụng ngôn ngữ này trong giao tiếp hàng ngày cũng như trong mã nguồn.

#### b. **Thiết kế Domain Model**
- **Domain Model** là biểu diễn logic nghiệp vụ trong mã nguồn, giúp phản ánh các quy tắc và hành vi của domain. 
- Xác định cách các **Entity**, **Value Objects**, và **Aggregate** tương tác với nhau và biểu diễn chúng trong mô hình.

### 3. **Thiết kế các lớp ứng dụng**

#### a. **Application Layer**
- Xây dựng **Application Services** để điều phối nghiệp vụ giữa các **Domain Services** và **Repository**.
- Application Services không nên chứa logic nghiệp vụ. Nó chỉ nên gọi các Domain Services và làm cầu nối giữa các lớp.

#### b. **Domain Layer**
- Đây là phần quan trọng nhất, chứa toàn bộ logic nghiệp vụ của ứng dụng.
- **Domain Services**: Chứa các nghiệp vụ phức tạp không thuộc về một Entity cụ thể, ví dụ tính toán chiết khấu, xử lý giao hàng.
- **Repository Interface**: Định nghĩa các phương thức để lưu trữ và truy xuất **Aggregate**.

#### c. **Infrastructure Layer**
- Triển khai các lớp hạ tầng như cơ sở dữ liệu, giao tiếp với các API bên ngoài, hoặc các dịch vụ bên ngoài khác (email, thanh toán).
- Thực hiện cụ thể các **Repository Interface** được định nghĩa trong **Domain Layer**.

#### d. **User Interface Layer (API hoặc Presentation Layer)**
- Xây dựng các **Controller** trong **NestJS** để xử lý yêu cầu từ phía người dùng (REST API, GraphQL).
- Các controller nhận request từ người dùng, gọi đến **Application Services**, và trả về kết quả cho client.

### 4. **Thiết kế và Triển khai Use Cases**

#### a. **Xác định các Use Case chính**
- Ví dụ các **Use Case** trong hệ thống Ecommerce bao gồm:
  - **Add Product to Cart**: Thêm sản phẩm vào giỏ hàng.
  - **Place Order**: Đặt hàng sau khi kiểm tra giỏ hàng.
  - **Process Payment**: Xử lý thanh toán cho đơn hàng.
  - **Ship Order**: Giao hàng cho đơn đặt hàng.
  - **Manage Inventory**: Quản lý kho hàng và số lượng sản phẩm.

#### b. **Thiết kế các Use Case cụ thể**
- Mỗi Use Case được triển khai dưới dạng một **Application Service** hoặc **Command**:
  - **Application Service** xử lý toàn bộ luồng nghiệp vụ của từng Use Case.
  - **Command** có thể được dùng để xử lý một hành động cụ thể, ví dụ **CreateOrderCommand**.

### 5. **Xây dựng các Repository và Domain Services**

#### a. **Xây dựng Repository Interface**
- Định nghĩa các **Repository Interface** trong **Domain Layer** để lưu trữ và truy xuất các **Aggregate**. Ví dụ:
  ```typescript
  export interface OrderRepository {
    save(order: Order): Promise<void>;
    findById(orderId: string): Promise<Order | null>;
  }
  ```

#### b. **Cụ thể hóa Repository trong Infrastructure Layer**
- Xây dựng các lớp triển khai của **Repository Interface** trong **Infrastructure Layer**, ví dụ triển khai lưu trữ **Order** vào cơ sở dữ liệu.

#### c. **Xây dựng Domain Services**
- Chứa các logic nghiệp vụ không liên quan trực tiếp đến một **Entity**. Ví dụ, **PricingService** để tính toán giá đơn hàng sau khi áp dụng các chiết khấu và thuế.

### 6. **Event Sourcing và Domain Events (nếu cần)**

#### a. **Xác định Domain Events**
- Xác định các sự kiện quan trọng trong domain, ví dụ **OrderPlaced**, **PaymentProcessed**, **OrderShipped**.
- **Domain Events** được kích hoạt khi một sự kiện quan trọng xảy ra trong hệ thống. Chúng có thể được sử dụng để thông báo cho các hệ thống hoặc module khác biết về sự thay đổi.

#### b. **Sử dụng Event Sourcing (nếu phù hợp)**
- **Event Sourcing** là mô hình trong đó thay vì lưu trạng thái hiện tại của một **Aggregate**, hệ thống lưu trữ các sự kiện đã diễn ra, từ đó có thể tái hiện lại trạng thái hiện tại.

### 7. **Kiểm tra và triển khai**

#### a. **Viết Unit Test và Integration Test**
- Đảm bảo rằng tất cả các lớp trong **Domain Layer** có các **Unit Test** để kiểm tra logic nghiệp vụ.
- Các **Integration Test** giúp kiểm tra xem các module khác nhau của ứng dụng có hoạt động đúng với nhau hay không.

#### b. **Triển khai và giám sát**
- Sử dụng các công cụ CI/CD để tự động hóa quá trình triển khai ứng dụng lên môi trường production.
- Thiết lập hệ thống giám sát và logging để theo dõi tình trạng hoạt động của ứng dụng.

### 8. **Duy trì và Mở rộng**

#### a. **Tối ưu hóa và cải tiến**
- Khi hệ thống phát triển, tiếp tục tối ưu hóa cấu trúc **Domain Model**, bổ sung thêm các nghiệp vụ và chức năng mới.
- Đảm bảo rằng hệ thống vẫn giữ được sự tách biệt giữa các domain và không bị "rò rỉ nghiệp vụ" giữa các **Bounded Contexts**.

#### b. **Xử lý các yêu cầu mới**
- Sử dụng các mô hình DDD để thêm các tính năng mới và đảm bảo rằng chúng được tích hợp hợp lý vào mô hình hiện tại.

### Tóm tắt các bước phát triển ứng dụng Ecommerce theo DDD

1. **Hiểu rõ domain và xác định các Bounded Contexts**.
2. **Thiết kế Ubiquitous Language và Domain Model**.
3. **Thiết kế Application Layer, Domain Layer và Infrastructure Layer**.
4. **Xác định và thiết kế các Use Case chính**.
5. **Xây dựng các Repository và Domain Services**.
6. **Triển khai Event Sourcing và Domain Events (nếu cần)**.
7. **Kiểm tra, triển khai và giám sát hệ thống**.
8. **Duy trì và mở rộng ứng dụng theo các yêu cầu mới**.

========================================================================================================================================

giả sử trong hệ thống Ecommerce đã chia nhỏ thành các context như:
Product Catalog: Quản lý sản phẩm, danh mục, chi tiết sản phẩm.
Order Management: Quản lý quy trình đặt hàng, xử lý đơn hàng.
Payment: Xử lý thanh toán và các phương thức thanh toán.
Shipping: Quản lý giao hàng và tính toán chi phí giao hàng.
Customer Management: Quản lý thông tin và tài khoản khách hàng.

Bạn là một chuyên gia và có kinh nghiệm chuyên về Domain Driven Design, hãy xác định các Entity và Value Objects chính trong các context trên.

Dựa trên việc chia các **Bounded Contexts** trong hệ thống Ecommerce thành các phần như **Product Catalog**, **Order Management**, **Payment**, **Shipping**, và **Customer Management**, dưới đây là việc xác định các **Entity** và **Value Objects** chính trong từng context. Việc phân định rõ ràng giữa **Entity** và **Value Object** rất quan trọng trong **Domain-Driven Design (DDD)** để giữ cho mô hình nghiệp vụ được rõ ràng và dễ quản lý.

### 1. **Product Catalog Context**
**Mục đích**: Quản lý sản phẩm, danh mục, và chi tiết sản phẩm.

#### **Entity**:
- **Product**: 
  - **Định nghĩa**: Sản phẩm là một thực thể có định danh duy nhất (ID), có thể thay đổi theo thời gian như giá, tồn kho.
  - **Thuộc tính**:
    - `id: string` (định danh)
    - `name: string` (tên sản phẩm)
    - `description: string` (mô tả)
    - `price: Price` (giá sản phẩm - thuộc **Value Object**)
    - `category: Category` (danh mục sản phẩm)
    - `inventory: Inventory` (tồn kho - thuộc **Value Object**)
  
- **Category**:
  - **Định nghĩa**: Danh mục chứa các sản phẩm, có định danh duy nhất và có thể thay đổi.
  - **Thuộc tính**:
    - `id: string` (định danh danh mục)
    - `name: string` (tên danh mục)
    - `parentCategory: Category | null` (nếu là danh mục con)

#### **Value Objects**:
- **Price**:
  - **Định nghĩa**: Giá sản phẩm, bất biến trong suốt vòng đời của một đối tượng. Giá trị có thể thay đổi, nhưng từng giá trị là bất biến.
  - **Thuộc tính**:
    - `amount: number` (số tiền)
    - `currency: string` (đơn vị tiền tệ)

- **Inventory**:
  - **Định nghĩa**: Quản lý số lượng sản phẩm tồn kho. Bất biến trong phạm vi một hành động, nhưng có thể thay đổi với các hành động khác nhau (nhập hàng, bán hàng).
  - **Thuộc tính**:
    - `quantity: number` (số lượng tồn kho)
    - `warehouseLocation: string` (vị trí kho)

---

### 2. **Order Management Context**
**Mục đích**: Quản lý quy trình đặt hàng, xử lý đơn hàng.

#### **Entity**:
- **Order**:
  - **Định nghĩa**: Đơn hàng chứa thông tin về các sản phẩm, khách hàng và trạng thái xử lý của đơn hàng.
  - **Thuộc tính**:
    - `id: string` (định danh đơn hàng)
    - `customer: Customer` (thông tin khách hàng)
    - `orderItems: OrderItem[]` (danh sách sản phẩm trong đơn hàng - thuộc **Value Object**)
    - `totalPrice: Price` (tổng giá trị đơn hàng)
    - `status: OrderStatus` (trạng thái đơn hàng - thuộc **Value Object**)

#### **Value Objects**:
- **OrderItem**:
  - **Định nghĩa**: Một dòng trong đơn hàng, chứa thông tin về sản phẩm và số lượng. Đây là đối tượng bất biến khi được thêm vào đơn hàng.
  - **Thuộc tính**:
    - `productId: string` (định danh sản phẩm)
    - `quantity: number` (số lượng)
    - `price: Price` (giá sản phẩm)

- **OrderStatus**:
  - **Định nghĩa**: Trạng thái của đơn hàng trong suốt quá trình xử lý.
  - **Thuộc tính**:
    - `status: string` (các trạng thái có thể là: pending, confirmed, shipped, delivered, cancelled)

---

### 3. **Payment Context**
**Mục đích**: Xử lý thanh toán và các phương thức thanh toán.

#### **Entity**:
- **Payment**:
  - **Định nghĩa**: Thanh toán đại diện cho quá trình xử lý thanh toán cho đơn hàng. Được định danh bởi **PaymentId** và liên quan đến đơn hàng và phương thức thanh toán.
  - **Thuộc tính**:
    - `id: string` (định danh thanh toán)
    - `order: Order` (đơn hàng cần thanh toán)
    - `amount: Price` (số tiền thanh toán)
    - `method: PaymentMethod` (phương thức thanh toán - thuộc **Value Object**)
    - `status: PaymentStatus` (trạng thái thanh toán - thuộc **Value Object**)

#### **Value Objects**:
- **PaymentMethod**:
  - **Định nghĩa**: Phương thức thanh toán được chọn bởi người dùng.
  - **Thuộc tính**:
    - `method: string` (ví dụ: CreditCard, PayPal, Stripe)

- **PaymentStatus**:
  - **Định nghĩa**: Trạng thái của thanh toán trong quá trình thực hiện.
  - **Thuộc tính**:
    - `status: string` (các trạng thái có thể là: pending, completed, failed, refunded)

---

### 4. **Shipping Context**
**Mục đích**: Quản lý giao hàng và tính toán chi phí giao hàng.

#### **Entity**:
- **Shipping**:
  - **Định nghĩa**: Giao hàng chứa thông tin về vận chuyển đơn hàng, bao gồm phương thức giao hàng và chi phí giao hàng.
  - **Thuộc tính**:
    - `id: string` (định danh giao hàng)
    - `order: Order` (đơn hàng cần giao)
    - `shippingMethod: ShippingMethod` (phương thức giao hàng - thuộc **Value Object**)
    - `shippingCost: Price` (chi phí giao hàng)

#### **Value Objects**:
- **ShippingMethod**:
  - **Định nghĩa**: Phương thức vận chuyển được chọn cho đơn hàng.
  - **Thuộc tính**:
    - `method: string` (ví dụ: Standard, Express, SameDay)
    - `estimatedDeliveryTime: number` (thời gian giao hàng dự kiến)

- **ShippingAddress**:
  - **Định nghĩa**: Địa chỉ giao hàng của khách hàng.
  - **Thuộc tính**:
    - `street: string` (đường)
    - `city: string` (thành phố)
    - `state: string` (bang/tỉnh)
    - `postalCode: string` (mã bưu điện)
    - `country: string` (quốc gia)

---

### 5. **Customer Management Context**
**Mục đích**: Quản lý thông tin và tài khoản khách hàng.

#### **Entity**:
- **Customer**:
  - **Định nghĩa**: Khách hàng là thực thể đại diện cho người dùng của hệ thống thương mại điện tử, có định danh duy nhất.
  - **Thuộc tính**:
    - `id: string` (định danh khách hàng)
    - `name: string` (tên khách hàng)
    - `email: string` (email liên hệ)
    - `addresses: Address[]` (danh sách địa chỉ giao hàng - thuộc **Value Object**)
    - `paymentMethods: PaymentMethod[]` (phương thức thanh toán đã lưu)

#### **Value Objects**:
- **Address**:
  - **Định nghĩa**: Địa chỉ của khách hàng để giao hàng hoặc thanh toán.
  - **Thuộc tính**:
    - `street: string` (đường)
    - `city: string` (thành phố)
    - `state: string` (bang/tỉnh)
    - `postalCode: string` (mã bưu điện)
    - `country: string` (quốc gia)

- **CustomerStatus**:
  - **Định nghĩa**: Trạng thái của khách hàng trong hệ thống.
  - **Thuộc tính**:
    - `status: string` (ví dụ: active, inactive, suspended)

---

### Tóm tắt các **Entity** và **Value Objects** theo từng Bounded Context:

#### **Product Catalog**:
- **Entity**: Product, Category
- **Value Objects**: Price, Inventory

#### **Order Management**:
- **Entity**: Order
- **Value Objects**: OrderItem, OrderStatus

#### **Payment**:
- **Entity**: Payment
- **Value Objects**: PaymentMethod, PaymentStatus

#### **Shipping**:
- **Entity**: Shipping
- **Value Objects**: ShippingMethod, ShippingAddress

#### **Customer Management**:
- **Entity**: Customer
- **Value Objects**: Address, CustomerStatus

---

### Nhận xét
Việc phân định rõ **Entity** và **Value Objects** theo từng **Bounded Context** trong **Domain-Driven Design** giúp giữ cho hệ thống dễ bảo trì và mở rộng. **Entity** thường là các đối tượng có định danh duy nhất và thay đổi theo thời gian, trong khi **Value Objects** là bất biến và chỉ có giá trị xác định chúng. Cách tổ chức này tạo ra sự rõ ràng trong logic nghiệp vụ và giúp hệ thống phản ánh đúng thực tế nghiệp vụ.


========================================================================================================================================

Trong **Domain-Driven Design (DDD)**, **Aggregate Root** là một khái niệm quan trọng, đại diện cho một nhóm các đối tượng (**Entity** và **Value Object**) có mối quan hệ chặt chẽ với nhau và được quản lý như một đơn vị duy nhất. **Aggregate Root** đóng vai trò như điểm vào duy nhất để tương tác với các đối tượng bên trong **Aggregate** và chịu trách nhiệm duy trì tính nhất quán của chúng.

Dưới đây là việc xác định các **Aggregate Root** dựa trên các **Bounded Contexts** mà chúng ta đã định nghĩa trước đó: **Product Catalog**, **Order Management**, **Payment**, **Shipping**, và **Customer Management**.

### 1. **Product Catalog Context**
**Mục tiêu**: Quản lý sản phẩm, danh mục và chi tiết sản phẩm.

#### **Aggregate Root: Product**
- **Product** là **Aggregate Root** trong **Product Catalog** context vì:
  - **Product** quản lý các thông tin về chính sản phẩm như giá cả, tồn kho, mô tả và thuộc về một danh mục (**Category**).
  - **Product** là thực thể chính mà các hành vi quản lý sản phẩm (thêm sản phẩm, cập nhật thông tin, kiểm tra tồn kho, thay đổi giá) sẽ được thực hiện thông qua nó.
  - **Category** có thể được xem như một entity độc lập, nhưng vẫn thuộc về sản phẩm, và thường thì người dùng thao tác thông qua **Product** khi chọn sản phẩm và danh mục của nó.

**Entities và Value Objects** bên trong Aggregate:
- **Entities**: 
  - **Product** (Aggregate Root)
  - **Category**
- **Value Objects**: 
  - **Price**
  - **Inventory**

**Tóm tắt**: **Product** quản lý tất cả các hành vi liên quan đến sản phẩm, từ thông tin giá cả đến quản lý tồn kho và danh mục.

---

### 2. **Order Management Context**
**Mục tiêu**: Quản lý quy trình đặt hàng và xử lý đơn hàng.

#### **Aggregate Root: Order**
- **Order** là **Aggregate Root** vì:
  - **Order** đại diện cho toàn bộ quá trình đặt hàng và quản lý các **OrderItem** (các sản phẩm bên trong đơn hàng).
  - **Order** chịu trách nhiệm cho việc quản lý trạng thái đơn hàng (pending, confirmed, shipped, delivered, etc.) và các thông tin quan trọng liên quan như tổng giá trị đơn hàng và danh sách sản phẩm trong đơn hàng.
  - Các hành vi như thay đổi trạng thái đơn hàng, tính tổng giá trị đơn hàng, và xử lý từng mặt hàng trong đơn hàng đều được quản lý thông qua **Order**.

**Entities và Value Objects** bên trong Aggregate:
- **Entities**:
  - **Order** (Aggregate Root)
- **Value Objects**:
  - **OrderItem**
  - **OrderStatus**
  - **Price**

**Tóm tắt**: **Order** là trung tâm của toàn bộ quy trình đặt hàng và xử lý trạng thái của đơn hàng, bao gồm các mặt hàng bên trong và tổng giá trị đơn hàng.

---

### 3. **Payment Context**
**Mục tiêu**: Xử lý thanh toán và các phương thức thanh toán.

#### **Aggregate Root: Payment**
- **Payment** là **Aggregate Root** trong **Payment** context vì:
  - **Payment** đại diện cho quá trình xử lý thanh toán của một đơn hàng cụ thể và chứa các thông tin liên quan như phương thức thanh toán (**PaymentMethod**) và trạng thái thanh toán (**PaymentStatus**).
  - Tất cả các hành vi liên quan đến thanh toán như tạo thanh toán, thay đổi trạng thái thanh toán, hoặc kiểm tra thông tin thanh toán đều được quản lý thông qua **Payment**.
  - **Payment** chịu trách nhiệm đảm bảo tính nhất quán của thông tin thanh toán và quá trình xử lý thanh toán cho một **Order**.

**Entities và Value Objects** bên trong Aggregate:
- **Entities**:
  - **Payment** (Aggregate Root)
- **Value Objects**:
  - **PaymentMethod**
  - **PaymentStatus**
  - **Price**

**Tóm tắt**: **Payment** quản lý toàn bộ quy trình thanh toán của một đơn hàng cụ thể, từ phương thức thanh toán đến trạng thái thanh toán.

---

### 4. **Shipping Context**
**Mục tiêu**: Quản lý giao hàng và tính toán chi phí giao hàng.

#### **Aggregate Root: Shipping**
- **Shipping** là **Aggregate Root** trong **Shipping** context vì:
  - **Shipping** đại diện cho quá trình vận chuyển một đơn hàng, bao gồm phương thức giao hàng (**ShippingMethod**) và chi phí vận chuyển (**Price**).
  - Tất cả các hành vi như tạo giao hàng, tính toán chi phí vận chuyển, và theo dõi trạng thái giao hàng đều được quản lý thông qua **Shipping**.
  - **Shipping** chịu trách nhiệm duy trì tính nhất quán của thông tin vận chuyển và đảm bảo rằng đơn hàng được vận chuyển theo đúng yêu cầu.

**Entities và Value Objects** bên trong Aggregate:
- **Entities**:
  - **Shipping** (Aggregate Root)
- **Value Objects**:
  - **ShippingMethod**
  - **ShippingAddress**
  - **Price**

**Tóm tắt**: **Shipping** chịu trách nhiệm quản lý toàn bộ quy trình vận chuyển cho một đơn hàng, bao gồm phương thức giao hàng, chi phí, và địa chỉ giao hàng.

---

### 5. **Customer Management Context**
**Mục tiêu**: Quản lý thông tin và tài khoản khách hàng.

#### **Aggregate Root: Customer**
- **Customer** là **Aggregate Root** trong **Customer Management** context vì:
  - **Customer** đại diện cho thông tin và hành vi liên quan đến khách hàng, bao gồm tên, địa chỉ, phương thức thanh toán, và trạng thái tài khoản (**CustomerStatus**).
  - Tất cả các hành vi liên quan đến quản lý thông tin khách hàng như cập nhật địa chỉ, trạng thái khách hàng, và phương thức thanh toán đều được quản lý thông qua **Customer**.
  - **Customer** chịu trách nhiệm duy trì tính nhất quán của thông tin khách hàng và quản lý tất cả các thao tác liên quan đến tài khoản của khách hàng.

**Entities và Value Objects** bên trong Aggregate:
- **Entities**:
  - **Customer** (Aggregate Root)
- **Value Objects**:
  - **Address**
  - **CustomerStatus**

**Tóm tắt**: **Customer** quản lý toàn bộ thông tin về khách hàng, bao gồm địa chỉ, trạng thái tài khoản, và phương thức thanh toán.

---

### Tóm tắt các **Aggregate Root** theo Bounded Context:

1. **Product Catalog Context**:
   - **Aggregate Root**: **Product**
   - **Entities**: **Product**, **Category**
   - **Value Objects**: **Price**, **Inventory**

2. **Order Management Context**:
   - **Aggregate Root**: **Order**
   - **Entities**: **Order**
   - **Value Objects**: **OrderItem**, **OrderStatus**, **Price**

3. **Payment Context**:
   - **Aggregate Root**: **Payment**
   - **Entities**: **Payment**
   - **Value Objects**: **PaymentMethod**, **PaymentStatus**, **Price**

4. **Shipping Context**:
   - **Aggregate Root**: **Shipping**
   - **Entities**: **Shipping**
   - **Value Objects**: **ShippingMethod**, **ShippingAddress**, **Price**

5. **Customer Management Context**:
   - **Aggregate Root**: **Customer**
   - **Entities**: **Customer**
   - **Value Objects**: **Address**, **CustomerStatus**

---

### Tóm lược về **Aggregate Root**:
- **Aggregate Root** trong mỗi **Bounded Context** là một thực thể quan trọng đại diện cho nhóm các đối tượng liên kết chặt chẽ với nhau.
- Mỗi **Aggregate Root** chịu trách nhiệm quản lý tính nhất quán và đảm bảo tính toàn vẹn của các đối tượng bên trong **Aggregate**.
- Các tương tác với hệ thống đều phải thông qua **Aggregate Root**, đảm bảo rằng các quy tắc nghiệp vụ được thực thi một cách chính xác.

Việc xác định **Aggregate Root** chính xác giúp hệ thống được tổ chức một cách có cấu trúc và dễ bảo trì, đảm bảo rằng tất cả các quy tắc nghiệp vụ được tuân thủ trong quá trình tương tác với các **Aggregate**.

========================================================================================================================================

### Thiết kế Domain Model: Tương tác giữa **Entity**, **Value Object**, và **Aggregate**

Trong **Domain-Driven Design (DDD)**, **Domain Model** đại diện cho cách các thành phần nghiệp vụ như **Entity**, **Value Object**, và **Aggregate** tương tác với nhau để phản ánh logic nghiệp vụ. Dưới đây, tôi sẽ trình bày mô hình tương tác và biểu diễn chúng trong từng **Bounded Context**: **Product Catalog**, **Order Management**, **Payment**, **Shipping**, và **Customer Management**.

### Tổng quan về các tương tác trong Domain Model

1. **Entity**: Là những đối tượng có định danh duy nhất và có thể thay đổi theo thời gian.
2. **Value Object**: Là những đối tượng không có định danh riêng và thường bất biến. Chúng được xác định bằng giá trị của chúng.
3. **Aggregate**: Là một tập hợp các **Entity** và **Value Object** có mối liên hệ với nhau, được quản lý bởi một **Aggregate Root** duy nhất. Tất cả các tương tác với các đối tượng bên trong Aggregate phải thông qua **Aggregate Root**.

---

### 1. **Product Catalog Context**

#### **Aggregate Root: Product**
- **Product** là **Aggregate Root** quản lý thông tin về sản phẩm và tương tác với các **Entity** và **Value Object** như:
  - **Category**: Xác định loại danh mục mà sản phẩm thuộc về.
  - **Price**: Giá sản phẩm (là một **Value Object**).
  - **Inventory**: Tồn kho sản phẩm (là một **Value Object**).

#### **Tương tác giữa các thành phần trong Product Catalog**

- **Product** quản lý **Price**, **Inventory**, và liên kết với **Category**.
- Khi **Product** thay đổi **Price**, một sự kiện sẽ được kích hoạt để thông báo về thay đổi giá.
- **Inventory** có thể thay đổi khi sản phẩm được bán ra hoặc nhập kho, và **Product** quản lý việc điều chỉnh số lượng tồn kho.

#### **Biểu đồ tương tác Domain Model (Product Catalog)**

```
Product (Aggregate Root)
├── Price (Value Object)
├── Inventory (Value Object)
└── Category (Entity)
```

#### **Biểu diễn code tương tác**

```typescript
class Product extends BaseAggregateRoot<string> {
  constructor(
    id: string,
    public name: string,
    public description: string,
    public price: Price,
    public category: Category,
    public inventory: Inventory,
  ) {
    super(id);
    this.validate();
  }

  // Change price method
  public changePrice(newPrice: Price): void {
    this.price = newPrice;
    this.addDomainEvent({ type: 'PriceChanged', data: { productId: this._id, newPrice } });
  }

  // Adjust inventory
  public adjustInventory(quantity: number): void {
    this.inventory.adjust(quantity);
    this.addDomainEvent({ type: 'InventoryAdjusted', data: { productId: this._id, quantity } });
  }
}
```

---

### 2. **Order Management Context**

#### **Aggregate Root: Order**
- **Order** là **Aggregate Root** quản lý quá trình đặt hàng, bao gồm danh sách các **OrderItem** và tính toán **Total Price**.
- **OrderItem** là một **Value Object** đại diện cho các mặt hàng trong đơn hàng.
- **OrderStatus** là một **Value Object** biểu diễn trạng thái của đơn hàng.

#### **Tương tác giữa các thành phần trong Order Management**

- **Order** quản lý danh sách **OrderItem**. Khi một mặt hàng được thêm vào đơn hàng, **Order** sẽ tính toán lại **Total Price**.
- **OrderStatus** sẽ thay đổi khi trạng thái đơn hàng cập nhật từ "pending" sang "shipped", "delivered", hoặc "cancelled".
- Mọi tương tác với **OrderItem** và thay đổi trạng thái đều phải thông qua **Order Aggregate Root**.

#### **Biểu đồ tương tác Domain Model (Order Management)**

```
Order (Aggregate Root)
├── OrderItem (Value Object)
├── OrderStatus (Value Object)
└── Price (Value Object)
```

#### **Biểu diễn code tương tác**

```typescript
class Order extends BaseAggregateRoot<string> {
  constructor(
    id: string,
    public customerId: string,
    public orderItems: OrderItem[],
    public totalPrice: Price,
    public status: OrderStatus,
  ) {
    super(id);
    this.validate();
  }

  // Add an item to the order
  public addItem(item: OrderItem): void {
    this.orderItems.push(item);
    this.calculateTotalPrice();
    this.addDomainEvent({ type: 'ItemAdded', data: { orderId: this._id, item } });
  }

  // Update order status
  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
    this.addDomainEvent({ type: 'StatusUpdated', data: { orderId: this._id, newStatus } });
  }

  // Calculate total price
  private calculateTotalPrice(): void {
    const total = this.orderItems.reduce((sum, item) => sum + item.price.amount * item.quantity, 0);
    this.totalPrice = new Price(total, this.totalPrice.currency);
    this.addDomainEvent({ type: 'TotalPriceUpdated', data: { orderId: this._id, totalPrice: this.totalPrice } });
  }
}
```

---

### 3. **Payment Context**

#### **Aggregate Root: Payment**
- **Payment** là **Aggregate Root** quản lý quá trình thanh toán cho một đơn hàng, bao gồm **PaymentMethod**, **PaymentStatus**, và **PaymentAmount** (biểu diễn dưới dạng **Price**).

#### **Tương tác giữa các thành phần trong Payment**

- **Payment** quản lý thông tin về phương thức thanh toán (**PaymentMethod**) và trạng thái thanh toán (**PaymentStatus**).
- **Payment** có thể chuyển từ trạng thái "pending" sang "completed" hoặc "failed" và kích hoạt sự kiện tương ứng.
- Khi thanh toán được xử lý, **Payment** sẽ ghi lại phương thức thanh toán và cập nhật trạng thái.

#### **Biểu đồ tương tác Domain Model (Payment)**

```
Payment (Aggregate Root)
├── PaymentMethod (Value Object)
├── PaymentStatus (Value Object)
└── Price (Value Object)
```

#### **Biểu diễn code tương tác**

```typescript
class Payment extends BaseAggregateRoot<string> {
  constructor(
    id: string,
    public orderId: string,
    public amount: Price,
    public method: PaymentMethod,
    public status: PaymentStatus
  ) {
    super(id);
    this.validate();
  }

  // Process the payment
  public processPayment(): void {
    this.status = new PaymentStatus('completed');
    this.addDomainEvent({ type: 'PaymentProcessed', data: { paymentId: this._id, orderId: this.orderId } });
  }

  // Refund the payment
  public refundPayment(): void {
    this.status = new PaymentStatus('refunded');
    this.addDomainEvent({ type: 'PaymentRefunded', data: { paymentId: this._id, orderId: this.orderId } });
  }
}
```

---

### 4. **Shipping Context**

#### **Aggregate Root: Shipping**
- **Shipping** là **Aggregate Root** quản lý quá trình vận chuyển, bao gồm **ShippingMethod**, **ShippingCost**, và **ShippingAddress**.

#### **Tương tác giữa các thành phần trong Shipping**

- **Shipping** quản lý thông tin về phương thức giao hàng (**ShippingMethod**) và địa chỉ giao hàng (**ShippingAddress**).
- **ShippingCost** có thể được tính toán dựa trên phương thức giao hàng và địa chỉ.
- Mọi thay đổi về phương thức giao hàng phải được thực hiện thông qua **Shipping Aggregate Root**.

#### **Biểu đồ tương tác Domain Model (Shipping)**

```
Shipping (Aggregate Root)
├── ShippingMethod (Value Object)
├── ShippingAddress (Value Object)
└── Price (Value Object)
```

#### **Biểu diễn code tương tác**

```typescript
class Shipping extends BaseAggregateRoot<string> {
  constructor(
    id: string,
    public orderId: string,
    public shippingMethod: ShippingMethod,
    public shippingCost: Price,
    public shippingAddress: ShippingAddress
  ) {
    super(id);
    this.validate();
  }

  // Update shipping method
  public updateShippingMethod(newMethod: ShippingMethod): void {
    this.shippingMethod = newMethod;
    this.addDomainEvent({ type: 'ShippingMethodUpdated', data: { shippingId: this._id, newMethod } });
  }

  // Calculate shipping cost
  public calculateShippingCost(): void {
    // Calculate cost based on method and address
    this.addDomainEvent({ type: 'ShippingCostCalculated', data: { shippingId: this._id, cost: this.shippingCost } });
  }
}
```

---

### 5. **Customer Management Context**

#### **Aggregate Root: Customer**
- **Customer** là **Aggregate Root** quản lý thông tin về khách hàng, bao gồm **Address** và **CustomerStatus**.

#### **Tương tác giữa các thành phần trong Customer Management**

- **Customer** quản lý danh sách các địa chỉ (**Address**) và trạng thái tài khoản (**CustomerStatus**).
- Khi khách hàng thêm địa chỉ mới, địa chỉ được thêm vào danh sách địa chỉ của khách hàng.
- **CustomerStatus** thay đổi khi tài khoản khách hàng bị khóa, mở lại, hoặc bị đình chỉ.

#### **Biểu đồ tương tác Domain Model (Customer Management)**

```
Customer (Aggregate Root)
├── Address (Value Object)
└── CustomerStatus (Value Object)
```

#### **Biểu diễn code tương tác**

```typescript
class Customer extends BaseAggregateRoot<string> {
  constructor(
    id: string,
    public name: string,
    public email: string,
    public addresses: Address[],
    public status: CustomerStatus
  ) {
    super(id);
    this.validate();
  }

  // Add an address for the customer
  public addAddress(newAddress: Address): void {
    this.addresses.push(newAddress);
    this.addDomainEvent({ type: 'AddressAdded', data: { customerId: this._id, newAddress } });
  }

  // Update customer status
  public updateStatus(newStatus: CustomerStatus): void {
    this.status = newStatus;
    this.addDomainEvent({ type: 'StatusUpdated', data: { customerId: this._id, newStatus } });
  }
}
```

---

### Kết luận
Thiết kế **Domain Model** trong **DDD** là bước quan trọng để xây dựng hệ thống phản ánh đúng nghiệp vụ. Các **Entity**, **Value Object**, và **Aggregate Root** tương tác với nhau để đảm bảo rằng hệ thống duy trì tính nhất quán và thực hiện đúng các quy tắc nghiệp vụ. Mỗi **Aggregate Root** chịu trách nhiệm quản lý các thành phần bên trong và điều phối mọi thay đổi, giúp hệ thống trở nên dễ mở rộng và bảo trì.

========================================================================================================================================

### Thiết kế **Infrastructure Layer** trong Domain-Driven Design (DDD)

**Infrastructure Layer** là nơi chứa các chi tiết cụ thể về cách lưu trữ, giao tiếp với các API bên ngoài, và tương tác với các dịch vụ bên ngoài khác. Nó cung cấp sự trừu tượng hóa giữa **Domain Model** và cơ sở hạ tầng. Trong **Domain-Driven Design (DDD)**, **Infrastructure Layer** chịu trách nhiệm triển khai các **Repository**, tích hợp các dịch vụ bên ngoài, và xử lý các phụ thuộc hạ tầng.

### 1. **Các trách nhiệm của Infrastructure Layer**
- **Repository Implementation**: Thực thi các **Repository Interface** được định nghĩa trong **Domain Layer** để lưu trữ và truy xuất dữ liệu từ cơ sở dữ liệu.
- **Service Integration**: Kết nối với các dịch vụ bên ngoài như thanh toán (Stripe, PayPal), vận chuyển, hoặc gửi email.
- **Persistence**: Tương tác với các cơ sở dữ liệu như **SQL**, **NoSQL** để lưu trữ thông tin.
- **Messaging**: Xử lý giao tiếp thông qua các message broker như **RabbitMQ**, **Kafka**.

### 2. **Cấu trúc tổng quát của Infrastructure Layer**

```
src/
├── modules/
│   ├── product-catalog/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   │   ├── persistence/
│   │   │   │   └── product-repository.impl.ts
│   │   │   ├── orm/
│   │   │   │   └── product.orm-entity.ts
│   │   │   ├── messaging/
│   │   │   │   └── product-event-producer.ts
│   │   │   └── services/
│   │   │       └── external-api.service.ts
│   ├── order-management/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   │   ├── persistence/
│   │   │   │   └── order-repository.impl.ts
│   │   │   ├── orm/
│   │   │   │   └── order.orm-entity.ts
│   │   │   ├── messaging/
│   │   │   │   └── order-event-producer.ts
│   │   │   └── services/
│   │   │       └── payment-gateway.service.ts
├── main.ts
```

---

### 3. **Triển khai các thành phần cụ thể trong Infrastructure Layer**

#### a. **Repository Implementation**
**Repository** là một pattern quan trọng trong DDD, dùng để trừu tượng hóa việc truy xuất và lưu trữ dữ liệu. Trong **Domain Layer**, các **Repository Interface** được định nghĩa, nhưng trong **Infrastructure Layer**, chúng được triển khai với cơ sở hạ tầng thực tế như cơ sở dữ liệu.

Ví dụ, **ProductRepository** cho **Product Catalog Context**:

```typescript
// product-repository.interface.ts (Domain Layer)
export interface ProductRepository {
  findById(productId: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
}
```

Trong **Infrastructure Layer**, triển khai **ProductRepository** với ORM (TypeORM) như sau:

```typescript
// product-repository.impl.ts (Infrastructure Layer)
import { ProductRepository } from '../../domain/repository/product-repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { ProductORMEntity } from '../orm/product.orm-entity';
import { getRepository } from 'typeorm';

export class ProductRepositoryImpl implements ProductRepository {
  private readonly ormRepo = getRepository(ProductORMEntity);

  // Tìm sản phẩm theo ID
  async findById(productId: string): Promise<Product | null> {
    const productORM = await this.ormRepo.findOne(productId);
    if (!productORM) return null;
    return new Product(productORM.id, productORM.name, productORM.description, productORM.price, productORM.category, productORM.inventory);
  }

  // Lưu sản phẩm vào cơ sở dữ liệu
  async save(product: Product): Promise<void> {
    const productORM = new ProductORMEntity();
    productORM.id = product.id;
    productORM.name = product.name;
    productORM.description = product.description;
    productORM.price = product.price.amount;
    productORM.category = product.category.id;
    productORM.inventory = product.inventory.quantity;
    await this.ormRepo.save(productORM);
  }
}
```

**ORM Entity** cho **Product** trong **Product Catalog**:

```typescript
// product.orm-entity.ts (Infrastructure Layer)
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class ProductORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column('int')
  inventory: number;
}
```

#### b. **Service Integration (Payment Gateway)**
Trong **Payment Context**, có thể tích hợp với cổng thanh toán bên ngoài như **Stripe** hoặc **PayPal** để xử lý các giao dịch thanh toán.

```typescript
// payment-gateway.service.ts (Infrastructure Layer)
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PaymentGatewayService {
  constructor(private readonly httpService: HttpService) {}

  // Xử lý thanh toán qua cổng Stripe
  async processPayment(orderId: string, amount: number): Promise<void> {
    const response = await this.httpService.post('https://api.stripe.com/v1/payments', {
      orderId,
      amount,
    }).toPromise();

    if (response.status !== 200) {
      throw new Error('Payment failed');
    }
  }

  // Hoàn tiền thanh toán
  async refundPayment(orderId: string): Promise<void> {
    const response = await this.httpService.post('https://api.stripe.com/v1/refunds', {
      orderId,
    }).toPromise();

    if (response.status !== 200) {
      throw new Error('Refund failed');
    }
  }
}
```

#### c. **Messaging (Event Producer)**
**Messaging** trong hệ thống phân tán dùng để giao tiếp giữa các dịch vụ, có thể sử dụng **Kafka**, **RabbitMQ** để phát sự kiện khi có thay đổi trong **Domain Model**.

```typescript
// product-event-producer.ts (Infrastructure Layer)
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductEventProducer {
  constructor(private readonly kafkaClient: ClientKafka) {}

  // Phát sự kiện khi thay đổi giá sản phẩm
  async publishPriceChange(productId: string, newPrice: number): Promise<void> {
    await this.kafkaClient.emit('product.price.changed', {
      productId,
      newPrice,
    });
  }

  // Phát sự kiện khi điều chỉnh tồn kho
  async publishInventoryAdjustment(productId: string, quantity: number): Promise<void> {
    await this.kafkaClient.emit('product.inventory.adjusted', {
      productId,
      quantity,
    });
  }
}
```

#### d. **External API Communication**
Trong nhiều trường hợp, cần tương tác với các dịch vụ bên ngoài thông qua API. Ví dụ, giao tiếp với dịch vụ vận chuyển để tính toán chi phí giao hàng trong **Shipping Context**.

```typescript
// external-api.service.ts (Infrastructure Layer)
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ExternalAPIService {
  constructor(private readonly httpService: HttpService) {}

  // Tính toán chi phí giao hàng qua API của dịch vụ vận chuyển
  async calculateShippingCost(address: string, weight: number): Promise<number> {
    const response = await this.httpService.post('https://shipping-api.com/calculate', {
      address,
      weight,
    }).toPromise();

    if (response.status !== 200) {
      throw new Error('Failed to calculate shipping cost');
    }

    return response.data.cost;
  }
}
```

---

### 4. **Kết nối Infrastructure với Domain Model**

- **Infrastructure Layer** luôn tuân theo các hợp đồng (**Repository Interface**, **Services Interface**) được định nghĩa trong **Domain Layer**.
- Các **Repository** trong **Infrastructure Layer** cụ thể hóa cách truy xuất và lưu trữ dữ liệu (cơ sở dữ liệu SQL, NoSQL, etc.), nhưng domain không quan tâm đến chi tiết này. Điều này đảm bảo rằng domain model không bị ràng buộc bởi cơ sở hạ tầng.
- Các sự kiện được phát từ **Domain Layer** (thông qua các **Domain Events**) sẽ được **Infrastructure Layer** xử lý, như phát sự kiện qua **Kafka** hoặc **RabbitMQ**.

---

### 5. **Tích hợp cơ sở dữ liệu với các Aggregates**

Khi triển khai **Aggregate Root**, chúng ta cần sử dụng các **Repository** để lưu trữ và truy xuất chúng từ cơ sở dữ liệu. Dưới đây là ví dụ tích hợp **Order** từ **Order Management Context**.

```typescript
// order-repository.impl.ts (Infrastructure Layer)
import { OrderRepository } from '../../domain/repository/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { OrderORMEntity } from '../orm/order.orm-entity';
import

 { getRepository } from 'typeorm';

export class OrderRepositoryImpl implements OrderRepository {
  private readonly ormRepo = getRepository(OrderORMEntity);

  // Tìm đơn hàng theo ID
  async findById(orderId: string): Promise<Order | null> {
    const orderORM = await this.ormRepo.findOne(orderId);
    if (!orderORM) return null;
    return new Order(orderORM.id, orderORM.customerId, orderORM.orderItems, orderORM.totalPrice, orderORM.status);
  }

  // Lưu đơn hàng vào cơ sở dữ liệu
  async save(order: Order): Promise<void> {
    const orderORM = new OrderORMEntity();
    orderORM.id = order.id;
    orderORM.customerId = order.customerId;
    orderORM.orderItems = order.orderItems.map(item => ({ ...item }));
    orderORM.totalPrice = order.totalPrice.amount;
    orderORM.status = order.status.status;
    await this.ormRepo.save(orderORM);
  }
}
```

---

### Tóm tắt
**Infrastructure Layer** trong **DDD** là nơi kết nối domain với các chi tiết kỹ thuật bên dưới, bao gồm cơ sở dữ liệu, dịch vụ bên ngoài, và giao tiếp qua các API. Nó trừu tượng hóa các phần liên quan đến hạ tầng để domain không phụ thuộc vào chi tiết triển khai. Khi thiết kế Infrastructure Layer, các **Repository**, **Service Integration**, **Messaging**, và **External API** đều được triển khai để hỗ trợ domain và các Aggregates theo đúng mục tiêu nghiệp vụ.