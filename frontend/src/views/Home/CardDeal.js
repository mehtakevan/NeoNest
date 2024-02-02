import { card } from "../../assets";
import styles, { layout } from "../../style";
import Button from "./Button";
import pay from '../../assets/pay.jpg'

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Pay anyone the fast, <br className="sm:block hidden" />  fee-free way
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Pay friends and family fee-free, no matter what bank account they use. Just slide.
      </p>

      {/* <Button styles={`mt-10`} /> */}
    </div>

    <div className={layout.sectionImg}>
      <img src={pay} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
