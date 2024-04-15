for fruit in apple orange banana pear; do
    echo "i like $fruit"
done
echo "--------------------"

sum=0
for VAR in $(seq 1 100); do
    let "sum+=VAR"
done
echo "总和是: $sum"
echo "--------------------"

for ((i = 1, j = 100; i <= 10; i++, j--)); do
    echo "i=$i,j=$j"
done

echo "--------------------"

psum=0
for VAR; do
    let "psum+=VAR"
done
echo "参数输入之和：$psum"
echo "--------------------"
